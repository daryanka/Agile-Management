<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'project_name', 'description', 'organisation_id'
    ];

    protected $table = "projects";
    protected $primaryKey = "id";

    public function comments() {
        return $this->hasMany("App\Comment", "project_id");
    }
}
