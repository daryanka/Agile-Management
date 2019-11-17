<?php

namespace App\Http\Controllers;

use App\Link;
use App\Traits\Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LinksController extends Controller
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
            "link_name" => "required|string",
            "link_url" => "required|string"
        ]);

        if (!$this->userBelongsToProject($this->request->user->organisation_id, $id)) {
            return response("Unauthorized", 401);
        }

        $this->request["project_id"] = $id;

        Link::create($this->request->all());

        return response("Link added", 200);
    }

    public function index($id) {
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $id)) {
            return response("Unauthorized", 401);
        }

        $links = DB::table("links")->where("project_id", "=", $id)->get();

        return response($links, 200);
    }
}
