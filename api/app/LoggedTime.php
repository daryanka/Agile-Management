<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LoggedTime extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'minutes_logged', 'user_id', 'description', 'project_id'
    ];

    protected $table = "logged_time";
    protected $primaryKey = "id";
}
