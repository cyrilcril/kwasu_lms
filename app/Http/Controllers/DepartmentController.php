<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faculty;
use App\Models\Department;
use App\Models\Unit;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('leave/Department');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //create leave-Department
        if(Department::where('department',$request->input('departmentName'))->first()){
            return redirect()->back();
        }else {
            if($request->isMethod('POST')){
                $leave_Department = new Department;
                $leave_Department->faculty_id = $request->input('faculty');
                $leave_Department->department = $request->input('departmentName');
                $leave_Department->save();
            }
            $faculty = Faculty::pluck('faculty','id');
            $leave_departments = Department::all();
            return view('leave/Department', ['leave_d' => $leave_departments, 'faculty' => $faculty]);
        }
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
        //Edit leave-department
        if($request->isMethod('POST')){
            $leave_Department = Department::find($id);
            $leave_Department->faculty_id = $request->input('faculty');
            $leave_Department->department = $request->input('departmentName');
            $leave_Department->save();

            return redirect('/department');
        }
        $faculty = Faculty::pluck('faculty','id');
        $leave_departments = Department::find($id);
        return view('leave/editDepartment', ['leave_d' => $leave_departments, 'faculty' => $faculty]);
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
    public function destroy(Request $request, $id)
    {
        //Delete leave-department
        $leave_departments = Department::find($id);
        $leave_departments->delete();

        return redirect('/department')->with('leave_d', $leave_departments);
    }
}
