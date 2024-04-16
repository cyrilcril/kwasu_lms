<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Notifications\Notifiable;

class allLeave extends Model
{
    use HasFactory, Notifiable;

    public function empolyee()
    {
        return $this->belongsTo('App\Employee');
    }

}
