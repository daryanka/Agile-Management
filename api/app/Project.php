<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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
        return $this->hasMany("App\Comment", "project_id", "id");
    }

    public function logged_work() {
        return $this->hasMany("App\LoggedTime", "project_id", "id");
    }

    public function links() {
        return $this->hasMany("App\Link", "project_id", "id");
    }

    public function users() {
        return $this->hasMany("App\ProjectUser", "project_id", "id")
            ->select("users.name AS user_name", "project_id", "users.id AS user_id")
            ->leftJoin("users", "project_user.user_id", "=", "users.id");
    }

    public function tasks() {
        return $this->hasMany("App\Task", "project_id", "id");
    }
}
