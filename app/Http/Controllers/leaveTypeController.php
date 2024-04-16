<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\leaveType;

class leaveTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('leave/leaveType');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //create leave-type
        if($request->isMethod('POST')){
            $leave_Type = new leaveType;
            $leave_Type->leave_type = $request->input('leaveType');
            $leave_Type->leave_days = $request->input('leaveDays');
            $leave_Type->staff_category = $request->input('staffCategory');
            $leave_Type->leave_description = $request->input('leaveDescription');
            $leave_Type->save();
        }
        $leave_types = leaveType::all();
        return view('leave/leaveType')->with('leave_t',$leave_types);
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
        //Edit leave-type
        if($request->isMethod('POST')){
            $leave_Type = leaveType::find($id);
            $leave_Type->leave_type = $request->input('leaveType');
            $leave_Type->staff_category = $request->input('staffCategory');
            $leave_Type->leave_days = $request->input('leaveDays');
            $leave_Type->leave_description = $request->input('leaveDescription');
            $leave_Type->save();

            return redirect('leaveType');
        }
        $leave_types = leaveType::find($id);
        return view('leave/editLeaveType')->with('leave_t',$leave_types);
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
        //Delete leave-type
        $leave_types = leaveType::find($id);
        $leave_types->delete();

        return redirect('leaveType')->with('leave_t',$leave_types);
    }
}
