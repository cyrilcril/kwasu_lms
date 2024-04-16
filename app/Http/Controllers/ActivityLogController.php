<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\Models\Activity;
use App\Models\activity_log;
use App\Models\User;

class ActivityLogController extends Controller
{
    Public function index()
    {
        $log = Activity::all();
        return view('leave.log',['log' => $log]);
    }
}
