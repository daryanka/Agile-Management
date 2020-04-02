<?php

namespace App\Http\Controllers;

use App\LoggedTime;
use App\Traits\Helper;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Project;

class TimeLoggedController extends Controller
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

    public function add($id) {
        //Check user belongs to project
        if (!$this->userBelongsToProject($this->request->user->organisation_id, $id)) {
            return response("Unauthorized", 401);
        }

        $this->validate($this->request, [
            "minutes_logged" => "numeric|required",
            "description" => "required|string"
        ]);
        $this->request["user_id"] = $this->request->user->id;
        $this->request["project_id"] = $id;
        LoggedTime::create($this->request->all());

        return response("Time logged", 200);
    }

    public function update($id) {
        //Check user has access to logged work
        $LoggedTime = LoggedTime::findOrFail($id);

        if ($LoggedTime->user_id !== $this->request->user->id) {
            return response("Unauthorized", 401);
        }

        $this->validate($this->request, [
            "minutes_logged" => "numeric",
            "description" => "string"
        ]);

        $LoggedTime->update($this->request->all());

        return response("Updated", 200);
    }

    public function delete($id) {
        $LoggedTime = LoggedTime::findOrFail($id);

        if ($LoggedTime->user_id !== $this->request->user->id) {
            return response("Unauthorized", 401);
        }

        $LoggedTime->delete();

        return response("Deleted", 200);
    }
}
