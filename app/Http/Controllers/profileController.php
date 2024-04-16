<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Employee;
use App\Models\NextOfKin;
use App\Models\Faculty;
use App\Models\Department;
use App\Models\Unit;
use carbon\Carbon;


class profileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = Auth::user()->name;
        $profile = Employee::all()->where('staff_id',$user)->first();

        if($request->isMethod('POST')){
                $employee = $profile;
                $employee->profile_picture = $request->file('photo')->getClientOriginalName();
                    $request->file('photo')->storeAs('/public/images/', $employee->profile_picture);
                $employee->lname = $request->input('lname');
                $employee->fname = $request->input('fname');
                $employee->oname = $request->input('oname');
                $employee->staff_id = $user;
                $employee->full_name = $request->input('lname')." ".$request->input('fname')." ".$request->input('oname');
                $employee->faculty = $request->input('faculty');
                $employee->salary_level = $request->input('salaryGradeLevel');
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

                $nextOfKin = $profile;
                $nextOfKin->staff_id = $employee->staff_id;
                $nextOfKin->title = $request->input('Ntitle');
                $nextOfKin->staff_next_of_kin = $request->input('Nsurname').' '.$request->input('Nothername').' '.$request->input('Nfirstname');
                $nextOfKin->staff_next_of_kin_relationship = $request->input('Nrelationship');
                $nextOfKin->staff_next_of_kin_email = $request->input('Nemail');
                $nextOfKin->staff_next_of_kin_phone = $request->input('NphoneNumber');
                $nextOfKin->staff_next_of_kin_address = $request->input('Naddress');
                $nextOfKin->save();

                return redirect('/')->with('success','Profile updated successfully!');
            }
        $faculty = Faculty::pluck('faculty','id');
        $department = Department::where('faculty_id',$request->id)->pluck('department','id')->take(100);
        $unit = Unit::pluck('unit','unit');

        return view('leave.profile', ['profile' => $profile, 
                                        'faculty' => $faculty,
                                        'department' => $department,
                                        'unit' => $unit]);   
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
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
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
