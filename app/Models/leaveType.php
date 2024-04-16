<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class leaveType extends Model
{
    use HasFactory, LogsActivity;

    //protected static $logName = 'user';
    protected static $logAttributes = ['leave_type', 'leave_days','created_at','updated_at'];
}
