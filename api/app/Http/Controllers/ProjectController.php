<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Link;
use App\LoggedTime;
use App\Project;
use App\Task;
use App\Traits\Helper;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    use Helper;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->middleware("auth");
    }

    public function create() {
        $this->validate($this->request, [
            "project_name" => "required|string|max:255",
            "description" => "required|string",
        ]);

        $this->request["organisation_id"] = $this->request->user->organisation_id;

        //Get organisation_id
        $project = Project::create($this->request->all());

        return response("Project Created", 200);
    }

    public function getProject($id) {
        $project = Project::findOrFail($id);

        //Check that user has access to the project
        if ($project->organisation_id !== $this->request->user->organisation_id) {
            return response("Unauthorized", 401);
        }

        //Get Comments Page
        $comments = Comment::where("project_id", "=", $id)->get();

        //Get Logged Work
        $logged_work = LoggedTime::where("project_id", "=", $id)->get();

        //Links
        $links = Link::where("project_id" , "=", $id)->get();

        //Users Assigned
        $assignedUsers = DB::table("project_user")->select(
            "users.name AS user_name",
            "users.id AS user_id"
            )
            ->leftJoin("users", "project_user.user_id", "=", "users.id")
            ->where("project_user.project_id", "=", $id)
            ->get();

        //Tasks
        $tasks = Task::where("project_id", "=", $id)->get();

        return response([
            "project" => $project,
            "comments" => $comments,
            "links" => $links,
            "users" => $assignedUsers,
            "tasks" => $tasks
        ], 200);
    }

    public function assignUser($id) {
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $id)) {
            return response("Unauthorized", 401);
        }

        $this->validate($this->request, [
            "user_id" => "required|integer"
        ]);

        //Check user exists
        if (!User::where("id" , "=" ,$this->request->user_id)->exists()) {
            return response("User does not exist", 422);
        };

        //Check if user already associated with project
        $alreadyAssigned = DB::table("project_user")
            ->where("project_id", "=", $id)
            ->where("user_id", "=", $this->request->user_id)
            ->exists();

        if ($alreadyAssigned) {
            return response("User already assigned to this project", 400);
        }

        DB::table("project_user")->insert([
            "user_id" => $this->request->user_id,
            "project_id" => $id,
        ]);

        return response("User assigned to project", 200);
    }

    public function unassignUser($id) {
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $id)) {
            return response("Unauthorized", 401);
        }

        $this->validate($this->request, [
            "user_id" => "required|integer"
        ]);

        //Check user exists
        if (!User::where("id" , "=" ,$this->request->user_id)->exists()) {
            return response("User does not exist", 422);
        };

        $alreadyAssigned = DB::table("project_user")
            ->where("project_id", "=", $id)
            ->where("user_id", "=", $this->request->user_id)
            ->first();

        if (!$alreadyAssigned) {
            return response("User not assigned to project", 400);
        }

        DB::table("project_user")
            ->where("project_id", "=", $id)
            ->where("user_id", "=", $this->request->user_id)
            ->delete();

        return response("User unassigned to project", 200);
    }

    public function me() {
        $projects = DB::table("project_user")
            ->select(
                "projects.id",
                "projects.project_name",
                "projects.description",
                "projects.priority"
            )
            ->leftJoin("projects", "projects.id", "=", "project_user.project_id")
            ->where("project_user.user_id", "=",$this->request->user->id)
            ->get();

        return response($projects, 200);
    }

    public function search() {
        $this->validate($this->request, [
            "search" => "required|string|max:255"
        ]);
        $organisationID = $this->request->user->organisation_id;

        $data = DB::table("projects")->select("project_name", "description", "priority")
            ->where("organisation_id", "=", $organisationID)
            ->where("project_name", "like", "%" . $this->request->search . "%")
            ->get();

        return response($data, 200);
    }
}
