<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Holiday;

class HolidayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return view('leave.holiday');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        if($request->isMethod('POST')){
            $holiday = new Holiday;
            $holiday->holiday_name = $request->input('holidayName');
            $holiday->start_date = $request->input('startDate');
            $holiday->end_date = $request->input('endDate');
            $holiday->no_of_days = $request->input('noOfDays');
            $holiday->save();
        }
        
        $holiday = Holiday::all();

        return view('leave.holiday', ['holiday' => $holiday]);
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
        //Edit Holiday
        if($request->isMethod('POST')){

            $holiday = Holiday::find($id);
            $holiday->holiday_name = $request->input('holidayName');
            $holiday->start_date = $request->input('startDate');
            $holiday->end_date = $request->input('endDate');
                // if($holiday->start_date == $holiday->end_date){
                //     $no_of_days = 1;
                // }elseif($holiday->end_date > $holiday->start_date) {
                //     $no_of_days = $holiday->end_date - $holiday->start_date;
                // }
            $holiday->no_of_days = $request->input('noOfDays');
            $holiday->save();

            return redirect('holiday');
        }

        $holiday = Holiday::find($id);
        return view('leave.editHoliday', ['holiday' => $holiday]);
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
        //Delete Holiday
        $holiday = Holiday::find($id);
        $holiday->delete();

        return redirect('holiday')->with('holiday',$holiday);
    }
}
