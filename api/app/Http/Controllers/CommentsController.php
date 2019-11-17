<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Traits\Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentsController extends Controller
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

    public function create($id) {
        $this->validate($this->request, [
            "comment_text" => "required|string"
        ]);

        if (!$this->userBelongsToProject($this->request->user->organisation_id, $id)) {
            return response("Unauthorized", 401);
        }

        $this->request["project_id"] = $id;
        $this->request["user_id"] = $this->request->user->id;


        Comment::create($this->request->all());


        return response("Comment created", 200);
    }

    public function index($id){
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $id)) {
            return response("Unauthorized", 401);
        }

        $comments = DB::table("comments")->where("project_id", "=", $id)->get();

        return response($comments, 200);
    }
}
