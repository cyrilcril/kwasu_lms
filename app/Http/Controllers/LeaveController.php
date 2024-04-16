<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\allLeave;
use App\Models\Employee;
use App\Models\leaveType;
use App\Models\User;
use App\Models\Holiday;
use App\Notifications\HodRecommend;
use Carbon\Carbon;



class LeaveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {
        $user = Auth::user()->name;
        $userExist = allLeave::where('staff_id',$user)->first();
        $approvalCheck = allLeave::orderBy('created_at', 'DESC')->where('staff_id',$user)->pluck('application_status')->first();
        $sharedLeave = allLeave::orderBy('created_at', 'DESC')
                                ->where('staff_id',$user)
                                ->whereIn('application_status',['Applied','VC has approved','REGISTRY has approved'])
                                ->pluck('shared_leave')->first();
                                //dd($sharedLeave);
        $sharedDays = allLeave::where('staff_id',$user)
                                ->where('application_status','Applied')->pluck('shared_days')->first();
        $department = Employee::where('staff_id','=',$user)->pluck("department")->first();
        $unit = Employee::where('staff_id','=',$user)->pluck("unit")->first();
        $holidays= Holiday::all()->pluck('start_date')->toArray();

        //Removing weekends and holidays from the leave days
        $startDate = $request->input('dateFrom');
            $leave_type = $request->input('leaveType');
            $leaveDays = leaveType::all()->where('leave_type','=',$leave_type)->pluck('leave_days');
            $leaveDays = empty($leaveDays[0]) ? 0 :  $leaveDays[0];
            $startDate = Carbon::parse($startDate);
        for ($i = 1; $i <= $leaveDays; $i++) {
            if (in_array(Carbon::parse($startDate)->addWeekdays($i)->toDateString(), $holidays)) {
                $startDate->addDay();
            }
        }

        $message = null;
        if($userExist === null){
            //Fresh application, For users that has never applied before
            $message = "Never Applied before";
            if($request->isMethod('POST')){
                $all_leave = new allLeave;
                $all_leave->staff_id = $user;
                $all_leave->department = $department;                        
                $all_leave->unit = $unit;
                $all_leave->leave_type = $request->input('leaveType');
                $all_leave->shared_leave = $request->input('sharedLeave');
                $all_leave->start_date = $request->input('dateFrom');
                $all_leave->leave_days = $leaveDays;
                $all_leave->end_date = $startDate->addWeekdays($leaveDays);
                $all_leave->application_status = 'Applied';
                $all_leave->default_days = $leaveDays;
                $all_leave->days_applied_for = $leaveDays;
                $all_leave->leave_description = $request->input('description');
                $all_leave->save();

                return redirect()->back()->with('success','Leave application was successfully!');
            }
                
        }else {
            if(in_array($approvalCheck, array('HOD has Recommend', 'PROVOST has Recommend'))){
                //Checks if the applicant has a pending application thats not yet approved or approval not complete
                $message = "Your application is awating approval";
            }elseif(in_array($approvalCheck, array('Applied','REGISTRY has approved', 'VC has approved'))){
                if($sharedLeave == "YES"){
                    //Application for those that shared leave
                    $message = "You have shared your leave earlier before now";
                    if($request->isMethod('POST')){
                        $all_leave = new allLeave;
                        $all_leave->staff_id = $user;
                        $all_leave->department = $department;
                        $all_leave->unit = $unit;
                        $all_leave->leave_type = $request->input('leaveType');
                        $all_leave->shared_leave = $request->input('sharedLeave');
                        $all_leave->start_date = $request->input('dateFrom');
                        $all_leave->leave_days = $leaveDays;
                        $all_leave->end_date = $startDate->addWeekdays($leaveDays);
                        $all_leave->application_status = 'Applied';
                        $all_leave->default_days = $leaveDays;
                        $all_leave->days_applied_for = $leaveDays;
                        $all_leave->leave_description = $request->input('description');
                        $all_leave->save();

                        return redirect()->back()->with('success','Leave application was successfully!');
                    }
                }elseif($sharedLeave == "NO"){
                    //Application for those that didnt share leave
                    $message = "You dont have any shared leave";
                    if($request->isMethod('POST')){
                        $all_leave = new allLeave;
                        $all_leave->staff_id = $user;
                        $all_leave->department = $department;
                        $all_leave->unit = $unit;
                        $all_leave->leave_type = $request->input('leaveType');
                        $all_leave->shared_leave = $request->input('sharedLeave');
                        $all_leave->start_date = $request->input('dateFrom');
                        $all_leave->leave_days = $leaveDays;
                        $all_leave->end_date = $startDate->addWeekdays($leaveDays);
                        $all_leave->application_status = 'Applied';
                        $all_leave->default_days = $leaveDays;
                        $all_leave->days_applied_for = $leaveDays;
                        $all_leave->leave_description = $request->input('description');
                        $all_leave->save();

                        return redirect()->back()->with('success','Leave application was successfully!');
                    }
                }else $message = "Neither No nor Yes";
            }else $message = "Neither Applied nor Approval";
        }
        
        $leaveType = leaveType::pluck('leave_type','leave_type');
        $allLeave = allLeave::orderBy('created_at', 'DESC')->where('staff_id','=',$user)->get();

        return view('leave.application', ['leave_t' => $leaveType, 
                                            'all_l' => $allLeave, 
                                            'sharedDays' => $sharedDays, 
                                            'message'=>$message,
                                            'approvalCheck'=>$approvalCheck,
                                            'userExist'=>$userExist])
                                            ->with('success','Leave application was successfully!');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        //Displaying the details of all Leave
        $allLeave = allLeave::all();
        $department = allLeave::all()->pluck('department');
        $noOfStaffInDepartment = allLeave::where('department',$department)->count();

        return view('leave.allLeave', ['all_l' => $allLeave, 'number' => $noOfStaffInDepartment]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        //Edit Application
        if($request->isMethod('POST')){

            $all_leave = allLeave::find($id);
            $all_leave->leave_type = $request->input('leaveType');
            $all_leave->start_date = $request->input('dateFrom');
                $leaveDays = leaveType::all()->where('leave_type','=',$all_leave->leave_type)->pluck('leave_days');
                $leaveDays = empty($leaveDays[0]) ? 0 :  $leaveDays[0];
            $all_leave->leave_days = $leaveDays;
            $newTime = date('d-m-Y', (strtotime($all_leave->date_from.' + '.$leaveDays.' days')));
            $newDate = date('Y-m-d', strtotime($newTime));
            $all_leave->end_date = $newDate;
            $all_leave->leave_description = $request->input('description');
            $all_leave->save();

            return redirect('application')->with('success','Leave application was updated!');
        }

        $applications = allLeave::find($id);
        $leaveType = leaveType::pluck('leave_type','leave_type');

        return view('leave.editApplication', ['application' => $applications, 'leave_t' => $leaveType,]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //Delete Leave Application
        $leave = allLeave::find($id);
        $leave->delete();

        return redirect('application')->with('leave',$leave);
    }

    public function applied()
    {
        $user = Auth::user()->name;
        $staffUnit = allLeave::where('staff_id','=',$user)->pluck("unit")->first();
        $staffDepartment = allLeave::where('staff_id','=',$user)->pluck("department")->first();
        $allLeave = allLeave::where('department', $staffDepartment)
                                    ->Where('unit', $staffUnit)
                                    ->whereBetween('created_at', [
                                        Carbon::now()->startOfYear(),
                                        Carbon::now()->endOfYear(),
                                    ])->get();;
        return view('leave.applied', ['all_l' => $allLeave]);
    }

    public function approval(Request $request, $id) {
        //Approval page
        $user = Auth::user()->name;
        $hodRec = [
            'body' => 'You received a new text notification',
            'hodText' => 'You have been recommended',
            'url' => url('/'),
            'thankyou' => 'Thank you very much for using our App',
        ];

        $staffId = allLeave::where('id',$id)->pluck('staff_id');
        $applicationOwner = User::where('name',$staffId);

        if($request->isMethod('POST')){
            switch ($request->input('submitButton')){
                case 'HOD RECOMMEND':
                    //HOD Approval
                    $allLeave = allLeave::find($id);
                    $allLeave->hod_remark = $request->input('hodRemark');
                    $allLeave->hod_remark_date = date('Y-m-d H:i:s');
                    $allLeave->save();

                    allLeave::where('id',"{$id}")->update(['application_status' => 'HOD has Recommend']);
                    $user->notify(new HodRecommend($hodRec));
                    return redirect('applied');
                break;

                case 'HOD DO NOT RECOMMEND':
                    //HOD Decline
                    //Employee::find($employee_id);
                    $allLeave = allLeave::find($id);
                    $allLeave->hod_remark = $request->input('hodRemark');
                    $allLeave->hod_remark_date = date('Y-m-d H:i:s');
                    $allLeave->save();

                    // if (Employee::where('employee_id',"{$employee_id}")->pluck('employee_category')->first() == 'Non-Teaching') {
                    //     allLeave::where('employee_id',"{$employee_id}")->update(['application_status' => 'HOD has declined']);
                    // }else
                    allLeave::where('id',"{$id}")->update(['application_status' => 'HOD do not Recommend']);
                    return redirect('applied');
                break;

                case 'PROVOST RECOMMEND':
                    //Provost approval
                    $allLeave = allLeave::find($id);
                    $allLeave->provost_remark = $request->input('provostRemark');
                    $allLeave->provost_remark_date = date('Y-m-d H:i:s');
                    $allLeave->save();

                    allLeave::where('id',"{$id}")->update(['application_status' => 'PROVOST has Recommend']);
                    return redirect('applied');
                break;

                case 'PROVOST DO NOT RECOMMEND':
                    //Provost Declined
                    $allLeave = allLeave::find($id);
                    $allLeave->provost_remark = $request->input('provostRemark');
                    $allLeave->provost_remark_date = date('Y-m-d H:i:s');
                    $allLeave->save();

                    allLeave::where('id',"{$id}")->update(['application_status' => 'PROVOST do not Recommend']);
                    return redirect('applied');
                break;

                case 'REGISTRY APPROVE':
                    //Registry approval
                    $allLeave = allLeave::find($id);
                    $allLeave->registry_remark = $request->input('registryRemark');
                    $allLeave->registry_remark_date = date('Y-m-d H:i:s');
                    $allLeave->save();

                    allLeave::where('id',"{$id}")->update(['application_status' => 'REGISTRY has approved']);
                    return redirect('applied');
                break;

                case 'REGISTRY DECLINE':
                    //Registry Declined
                    $allLeave = allLeave::find($id);
                    $allLeave->registry_remark = $request->input('registryRemark');
                    $allLeave->registry_remark_date = date('Y-m-d H:i:s');
                    $allLeave->save();

                    allLeave::where('id',"{$id}")->update(['application_status' => 'REGISTRY has declined']);
                    return redirect('applied');
                break;

                case 'VC APPROVE':
                    //VC approval
                    $allLeave = allLeave::find($id);
                    $allLeave->vc_remark = $request->input('vcRemark');
                    $allLeave->vc_remark_date = date('Y-m-d H:i:s');
                    $allLeave->save();
                    
                    allLeave::where('id',"{$id}")->update(['application_status' => 'VC has approved']);
                    return redirect('applied');
                break;

                case 'VC DECLINE':
                    //VC Declined
                    $allLeave = allLeave::find($id);
                    $allLeave->vc_remark = $request->input('vcRemark');
                    $allLeave->vc_remark_date = date('Y-m-d H:i:s');
                    $allLeave->save();

                    allLeave::where('id',"{$id}")->update(['application_status' => 'VC has declined']);
                    return redirect('applied');
                break;
            }
        }
        $allLeave = allLeave::find($id);
        return view('leave/approval')->with('all_l',$allLeave);
    }

    public function getApprovedLeave (){

        return view('leave.approved');
    }

    public function getleaveViewDetails($staff_id,$id){
        //view applicant details 
        $employee = Employee::whereStaff_id($staff_id)->first();
        $leave = allLeave::where('id',"{$id}")->first();
        $leaves = allLeave::all()->where('staff_id',"{$staff_id}");

        return view('leave.leaveViewDetails', ['emp' => $employee, 'leave' => $leave, 'leave_details' => $leaves]);
    }
}
