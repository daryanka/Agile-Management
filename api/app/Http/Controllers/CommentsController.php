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

        $comments = DB::table("comments")
            ->select(
                "comments.id AS id",
                "user_id",
                "comment_text",
                "name"
            )
            ->leftJoin("users", "users.id", "=", "comments.user_id")
            ->where("project_id", "=", $id)
            ->get();

        return response($comments, 200);
    }

    public function update($id) {
        $comment = Comment::find($id);

        if (empty($comment)) {
            return response("No comment found.", 404);
        }

        if (!$this->userBelongsToProject($this->request->user->organisation_id, $comment->project_id)) {
            return response("Unauthorized", 401);
        }

        $this->validate($this->request, [
            "comment_text" => "string",
        ]);

        if ($this->request->has("comment_text")) {$comment->comment_text = $this->request->comment_text;}

        $comment->save();

        return response("Updated comment.",200);
    }

    public function delete($id) {
        $comment = Comment::find($id);

        if (empty($comment)) {
            return response("No comment found.", 404);
        }

        if (!$this->userBelongsToProject($this->request->user->organisation_id, $comment->project_id)) {
            return response("Unauthorized", 401);
        }

        $comment->delete();

        return response("Comment deleted.",200);
    }
}
