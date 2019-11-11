<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organisation extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'organisation_name'
    ];

    protected $table = "organisations";
    protected $primaryKey = "id";

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];
}
