<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Unit;

class UnitController extends Controller
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
        //create new Unit
        if(Unit::where('unit',$request->input('unit'))->first()){
            return redirect()->back();
        }else {
            if($request->isMethod('POST')){
                $leave_Department = new Unit;
                $leave_Department->unit = $request->input('unit');
                $leave_Department->unit_short_code = $request->input('unitShortName');
                $leave_Department->save();
            }
            $unit = Unit::all();
            return view('leave/unit', ['unit' => $unit]);
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
            $unit = Unit::find($id);
            $unit->unit = $request->input('unit');
            $unit->unit_short_code = $request->input('unitShortName');
            $unit->save();

            return redirect('/unit');
        }
        $unit = Unit::find($id);
        return view('leave/editUnit', ['unit' => $unit]);
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
        $unit = Unit::find($id);
        $unit->delete();

        return redirect('/unit')->with('leave_d', $unit);
    }
}
