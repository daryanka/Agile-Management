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

    public function users() {
        return $this->hasMany("App\Users", "organisation_id");
    }

    public function projects() {
        return $this->hasMany("App\Project", "organisation_id");
    }
}
