<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Employee;
use App\Models\allLeave;
use App\Models\NextOfKin;
use App\Models\Faculty;
use App\Models\Department;
use App\Models\Unit;
use carbon\Carbon;

class signUpsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('leave.signUp');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request){
        $user = Auth::user()->name;

        if($request->isMethod('POST')){
            if(Employee::where('staff_id','=', $user)->first()) {
                return redirect()->back();
            }else {
                $employee = new Employee;
                $employee->lname = $request->input('lname');
                $employee->fname = $request->input('fname');
                $employee->oname = $request->input('oname');
                $employee->staff_id = $user;
                $employee->full_name = $request->input('lname')." ".$request->input('fname')." ".$request->input('oname');
                $employee->faculty = $request->input('faculty');
                //$employee->salary_level = $request->input('salaryGradeLevel');
                $employee->employee_type = $request->input('staffType');
                $employee->employee_category = $request->input('staffCategory');
                $employee->date_of_first_appointment= $request->input('dateOfFirstAppointment');
                $employee->date_of_last_appointment= $request->input('dateOfLastAppointment');

                $employee->country = $request->input('country');
                $employee->state = $request->input('state');
                $employee->local_government_area = $request->input('localGovernmentArea');
                $employee->marital_status = $request->input('maritalStatus');
                $employee->email = auth()->user()->email;
                $employee->phone_number = $request->input('phoneNumber');
                $employee->date_of_birth = $request->input('dateOfBirth');
                $employee->age = Carbon::parse($employee->date_of_birth)->age;
                $employee->place_of_birth = $request->input('placeOfBirth');
                $employee->religion = $request->input('religion');
                $employee->gender = $request->input('gender');
                $employee->title = $request->input('title');
                $employee->address = $request->input('address');
                $employee->permanent_address = $request->input('permanentAddress');
                $employee->extra_curicullar_activities = $request->input('extraCuricularActivities');
                $employee->save();

                $nextOfKin = new NextOfKin;
                $nextOfKin->staff_id = $employee->staff_id;
                $nextOfKin->title = $request->input('Ntitle');
                $nextOfKin->staff_next_of_kin = $request->input('Nsurname').' '.$request->input('Nothername').' '.$request->input('Nfirstname');
                $nextOfKin->staff_next_of_kin_relationship = $request->input('Nrelationship');
                $nextOfKin->staff_next_of_kin_email = $request->input('Nemail');
                $nextOfKin->staff_next_of_kin_phone = $request->input('NphoneNumber');
                $nextOfKin->staff_next_of_kin_address = $request->input('Naddress');
                $nextOfKin->save();

                return redirect('/application');
            }
        }
        $faculty = Faculty::pluck('faculty','id');
        $department = Department::where('faculty_id',$request->id)->pluck('department','id')->take(100);
        $unit = Unit::pluck('unit','unit');

        return view ('leave.signUp', ['user' => $user, 
                                        'unit' => $unit, 
                                        'faculty' => $faculty, 
                                        'department'=>$department]);
        return json_encode($department);
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
    public function show(Request $request){
        //view applicant details 
        if($request->isMethod('POST')){
            $empSearch = $request->input('search');
            if(Employee::where('staff_id','=', $empSearch)->exists()) {
                $employee = Employee::whereStaff_id($empSearch)->first();
                $leave = allLeave::where('staff_id',"{$empSearch}")->first();
                $leaves = allLeave::all()->where('staff_id',"{$empSearch}");
                
                return view('leave.leaveViewDetails', ['emp' => $employee, 'leave' => $leave, 'leave_details' => $leaves]);
            }else return redirect()->back();
        }
        return view ('leave.search');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }
}
