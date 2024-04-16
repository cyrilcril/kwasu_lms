<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faculty;


class FacultyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('leave/faculty');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //create new Faculty
        if(Faculty::where('faculty',$request->input('faculty'))->first()){
            return redirect()->back();
        }else {
            if($request->isMethod('POST')){
                $leave_Department = new Faculty;
                $leave_Department->faculty = $request->input('faculty');
                $leave_Department->faculty_short_code = $request->input('facultyShortCode');
                $leave_Department->save();
            }
            $faculty = Faculty::all();
            return view('leave/faculty', ['faculty' => $faculty]);
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
        //Edit Faculty
        if($request->isMethod('POST')){
            $faculty = Faculty::find($id);
            $faculty->faculty = $request->input('faculty');
            $faculty->faculty_short_code = $request->input('facultyShortCode');
            $faculty->save();

            return redirect('/faculty');
        }
        $faculty = Faculty::find($id);
        return view('leave/editFaculty', ['faculty' => $faculty]);
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
        //Delete Faculty
        $faculty = Faculty::find($id);
        $faculty->delete();

        return redirect('/faculty')->with('leave_d', $faculty);
    }
}
