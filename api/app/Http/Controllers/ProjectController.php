<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
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

    public function add() {
        $this->validate($this->request, [
            "project_name" => "required|string|max:255",
            "description" => "required|string",
        ]);

        $this->request["organisation_id"] = $this->request->user->organisation_id;

        //Get organisation_id
        $project = Project::create($this->request->all());
    }
}
