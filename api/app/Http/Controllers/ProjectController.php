<?php

namespace App\Http\Controllers;

use App\Comment;
use App\File;
use App\Link;
use App\LoggedTime;
use App\Project;
use App\Task;
use App\Traits\Helper;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Console\Input\Input;

class ProjectController extends Controller
{
    use Helper;
    var $request;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->middleware("auth", ["except" => "test"]);
    }

    public function create() {
        $this->validate($this->request, [
            "project_name" => "required|string|max:255",
            "description" => "required|string",
            "links" => "array",
            "links.*.link_name" => "required|string",
            "links.*.link_url" => "required|string",
            "assignee" => "integer",
            "files.*" => "file|max:1999", //2mb max
        ]);

        $this->request["organisation_id"] = $this->request->user->organisation_id;

        //Get organisation_id
        $project = Project::create([
            "project_name" => $this->request->project_name,
            "description" => $this->request->description,
            "organisation_id" => $this->request->user->organisation_id,
        ]);

        //Create links
        if (!empty($this->request->links)) {
            foreach ($this->request->links as $link) {
                Link::create([
                    "project_id" => $project->id,
                    "link_name" => $link["link_name"],
                    "link_url" => $link["link_url"],
                ]);
            }
        }

        //Assign to users
        if (!empty($this->request->assignee)) {
            DB::table("project_user")->insert([
                "user_id" => $this->request->assignee,
                "project_id" => $project->id
            ]);
        }

        //Upload files
        if ($this->request->file("files")) {
            foreach ($this->request->file("files") as $file) {
                $fileName = $file->getClientOriginalName();
                $fileSaveName = time()."-".$fileName;

                Storage::put("/projects/{$project->id}/{$fileSaveName}", file_get_contents($file));

                file::create([
                    "user_id" => $this->request->user->id,
                    "project_id" => $project->id,
                    "url" => "projects/{$project->id}/{$fileSaveName}",
                    "file_name" => $fileName,
                    "file_save_name" => $fileSaveName
                ]);
            }
        }

        return response("Project Created", 200);
    }

    public function update($id) {
        $project = Project::find($id);

        $this->validate($this->request, [
            "description" => "string",
            "title" => "string"
        ]);

        if (empty($project)) {
            return response(["message" => "Project not found."], 404);
        }

        //Check that user has access to the project
        if ($project->organisation_id !== $this->request->user->organisation_id) {
            return response("Unauthorized", 401);
        }

        if ($this->request->has("description")) { $project->description = $this->request->description; }
        if ($this->request->has("title")) { $project->project_name = $this->request->title; }

        $project->save();

        return response("Updated Project", 200);
    }

    public function getProject($id) {
        $project = Project::select(
            "id",
            "project_name",
            "description",
            "organisation_id",
            "priority",
            "created_at",
            "updated_at",
        )
            ->with(["comments" => function($query) {
                $query->select("comments.id AS id", "comment_text", "users.name", "comments.user_id AS user_id", "project_id")
                    ->leftJoin("users", "users.id", "=", "comments.user_id");
            }])
            ->with(["logged_work" => function($query) {
                $query->select("logged_time.id AS id", "minutes_logged", "description", "users.name AS name", "project_id")
                    ->leftJoin("users", "users.id", "=", "logged_time.user_id");
            }])
            ->with("links")
            ->with("users")
            ->with("tasks")
            ->with("files")
            ->where("projects.id", "=", $id)
            ->first();

        if (empty($project)) {
            return response(["message" => "Project not found."], 404);
        }

        //Check that user has access to the project
        if ($project->organisation_id !== $this->request->user->organisation_id) {
            return response("Unauthorized", 401);
        }

        $allUsers = User::where("organisation_id", "=", $project->organisation_id)->get();
        $time_logged = LoggedTime::select(
            DB::raw("SUM(minutes_logged) AS total_time")
        )
            ->where("project_id", "=", $id)
            ->groupBy("project_id")
            ->first();

        if (empty($time_logged)) {
            $time_logged = 0;
        } else {
            $time_logged = $time_logged->total_time;
        }

        return response([
            "project" => $project,
            "all_users" => $allUsers,
            "time_logged" => $time_logged
        ], 200);
    }

    public function assignUser($id) {
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $id)) {
            return response("Unauthorized", 401);
        }

        $this->validate($this->request, [
            "users" => "array|present",
            "users.*" => "integer"
        ]);

        foreach ($this->request->users as $userID) {
            //Check user exists
            if (!User::where("id" , "=" ,$userID)->exists()) {
                return response("User does not exist", 422);
            };
        }

        DB::table("project_user")->delete();

        foreach ($this->request->users as $userID) {
            DB::table("project_user")->insert([
                "user_id" => $userID,
                "project_id" => $id,
            ]);
        }

        return response("Project users updated.", 200);
    }

    public function getAssignedUsers($id) {
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $id)) {
            return response("Unauthorized", 401);
        }

        $users = DB::table("project_user")->select(
            "users.id AS user_id",
            "users.name AS user_name"
        )
            ->leftJoin("users", "users.id", "=", "project_user.user_id")
            ->where("project_user.project_id", "=", $id)
            ->get();

        return response($users, 200);
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
            "search" => "string|max:255"
        ]);
        $organisationID = $this->request->user->organisation_id;

        if (empty($this->request->search)) {
            $data = DB::table("projects")->select("project_name", "description", "priority", "id")
                ->where("organisation_id", "=", $organisationID)
                ->limit(20)
                ->get();

            return response($data, 200);
        }

        $data = DB::table("projects")->select("project_name", "description", "priority", "id")
            ->where("organisation_id", "=", $organisationID)
            ->where("project_name", "LIKE", "%" . $this->request->search . "%")
            ->limit(20)
            ->get();

        return response($data, 200);
    }

    public function test() {
        $this->validate($this->request, [
            "files.*" => "file|max:1999|required"
        ]);

        $fileNames = [];

        if ($this->request->hasFile("files")) {
            foreach ($this->request->file("files") as $file) {
                $filename = $file->getClientOriginalName();
                array_push($fileNames, $filename);
            }
        }

        dd($fileNames);

        $fileName = $this->request->file('file')->getClientOriginalName();

        $this->request->file("file")->move("public/test", $fileName);

        $public = base_path();
//        return response()->download("$public/public/public/test/Udemy - Understanding TypeScript - 2020 Edition.torrent", "test");
    }
}
