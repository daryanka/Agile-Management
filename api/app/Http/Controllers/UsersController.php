<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    var $request;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->middleware("auth");
        $this->middleware("role:admin", ["except" => ["index"]]);
    }

    public function index() {
        $users = User::select("id", "name", "email")->where("organisation_id", "=", $this->request->user->organisation_id)->get();

        return response($users, 200);
    }

    public function create() {
        $this->validate($this->request, [
            "name" => "required|string|max:255",
            "email" => "required|email|unique:users,email|max:255",
            "password" => "required|string"
        ]);

        $this->request["organisation_id"] = $this->request->user->organisation_id;
        $this->request["role"] = "Other";
        $this->request["password"] = Hash::make($this->request->password);

        User::create($this->request->all());

        return response("User created", 200);
    }

    public function update($id) {
        $this->validate($this->request, [
            "name" => "string|required",
            "email" => "string"
        ]);

        //Check that use belongs to same organisation as admin
        $user = User::find($id);

        if (empty($user)) {
            return response("No user found", 404);
        }

        if ($user->organisation_id !== $this->request->user->organisation_id) {
            return response("Unauthorized", 401);
        }

        if ($this->request->has("name")) { $user->name = $this->request->name; }
        if ($this->request->has("email")) {$user->email = $this->request->email;}

        $user->save();

        return response($user, 200);
    }

    public function delete($id) {
        //Check that use belongs to same organisation as admin
        $user = User::find($id);

        if (empty($user)) {
            return response("No user found", 404);
        }

        if ($user->organisation_id !== $this->request->user->organisation_id) {
            return response("Unauthorized", 401);
        }

        $user->delete();

        return response("User Delete", 200);
    }
}
