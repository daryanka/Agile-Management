<?php

namespace App\Http\Controllers;

use App\Task;
use App\Traits\Helper;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TasksController extends Controller
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

    public function create($id){
        //Check user belongs to project
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $id)) {
            return response("Unauthorized", 401);
        }

        $this->validate($this->request, [
            "title" => "required|string|max:255",
            "description" => "required|string",
            "user_id" => "required|integer"
        ]);

        //Check user id is part of this organisation

        $userIDCheck = DB::table("users")->where("id", "=", $this->request->user_id)->first();
        if (!$userIDCheck) {
            return response("User does not exist", 400);
        }

        if ($userIDCheck->organisation_id !== $this->request->user->organisation_id) {
            return respones("Cannot assign user to this task", 400);
        }

        //Status + Project ID
        $this->request["status"] = 0;
        $this->request["project_id"] = $id;

        Task::create($this->request->all());

        return response("Task created", 200);
    }

    public function update($id) {
        //Check that the project to which the task belongs to is of the same organisation as the user
        $projectId = Task::findOrFail($id)->project_id;

        //Check user belongs to project
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $projectId)) {
            return response("Unauthorized", 401);
        }

        $this->validate($this->request, [
            "title" => "|string|max:255",
            "description" => "|string",
            "user_id" => "integer"
        ]);

        if ($this->request->user_id) {
            $userIDCheck = DB::table("users")->where("id", "=", $this->request->user_id)->first();
            if (!$userIDCheck) {
                return response("User does not exist", 400);
            }
            if ($userIDCheck->organisation_id !== $this->request->user->organisation_id) {
                return respones("Cannot assign user to this task", 400);
            }
        }

        Task::where("id", "=", $id)->update($this->request->only(["title", "description", "user_id"]));


        return response("Updated task", 200);
    }
}
