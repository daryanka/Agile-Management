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
     * @var Request
     */
    private $request;

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
            "user_id" => "integer|nullable"
        ]);

        //Check user id is part of this organisation

        $userIDCheck = DB::table("users")->where("id", "=", $this->request->user_id)->first();
        if (!empty($this->request->user_id)) {
            if (!$userIDCheck) {
                return response("User does not exist", 400);
            }

            if ($userIDCheck->organisation_id !== $this->request->user->organisation_id) {
                return respones("Cannot assign user to this task", 400);
            }
        }

        //Status + Project ID
        $this->request["status"] = 0;
        $this->request["project_id"] = $id;

        Task::create($this->request->all());

        return response("Task created", 200);
    }

    public function single($id) {
        $task = Task::find($id);

        if (empty($task)) {
            return response(["message" => "No task found."], 404);
        }

        //Check user belongs to project
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $task->project_id)) {
            return response("Unauthorized", 401);
        }

        return response($task, 200);
    }

    public function update($id) {
        //Check that the project to which the task belongs to is of the same organisation as the user
        $task = Task::find($id);

        if (empty($task)) {
            return response(["message" => "No task found."], 404);
        }

        //Check user belongs to project
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $task->project_id)) {
            return response("Unauthorized", 401);
        }

        $this->validate($this->request, [
            "title" => "string|max:255",
            "description" => "|string",
            "user_id" => "integer|nullable",
            "status" => "in:0,1,2"
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

        $task->update($this->request->only(["title", "description", "user_id", "status"]));


        return response("Updated task", 200);
    }

    public function delete($id) {
        $task = Task::find($id);

        if (empty($task)) {
            return response(["message" => "No task found."], 404);
        }

        //Check user belongs to project
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $task->project_id)) {
            return response("Unauthorized", 401);
        }

        $task->delete();

        return response("Deleted Task", 200);
    }

    public function myTasks() {
        $tasks = Task::where("user_id", "=", $this->request->user->id)->get();

        return response($tasks, 200);
    }
}
