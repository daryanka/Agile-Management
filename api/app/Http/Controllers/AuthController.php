<?php

namespace App\Http\Controllers;

use App\Organisation;
use App\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->middleware("auth",["only" => ["test"]]);
    }

    protected function jwt($user) {
        $payload = [
            'iss' => "lumen-jwt", // Issuer of the token
            'sub' => $user->id, // Subject of the token
            'iat' => time(), // Time when JWT was issued.
            'exp' => time() + 60*60 * 24 // Expiration time 12 Hours
        ];

        // As you can see we are passing `JWT_SECRET` as the second parameter that will
        // be used to decode the token in the future.
        return JWT::encode($payload, env('JWT_SECRET'));
    }

    public function login() {
        //Validate User
        $this->validate($this->request, [
            "email" => "required|string|max:255",
            "password" => "required|string|max:255"
        ]);

        //Get User
        $user = User::where("email", $this->request->email)->first();

        if (!$user) {
            return response("Invalid email/password combination", 400);
        }

        $validPassword = Hash::check($this->request->password, $user->password);

        if (!$validPassword) {
           return response("Invalid email/password combination", 400);
        }

        return response(["token" => $this->jwt($user)]);
    }

    public function register() {
        $this->validate($this->request, [
            "email" => "required|email|max:255|unique:users,email",
            "name" => "required|max:255|string",
            "password" => "required|max:255",
            "organisation_name" => "required|max:255|string"
        ]);

        $organisation = Organisation::create($this->request->all());
        $password = Hash::make($this->request->password);
        $this->request["role"] = "admin";

        $this->request["password"] = $password;
        $this->request["organisation_id"] = $organisation->id;

        $user = User::create($this->request->all());

        return response(["token" => $this->jwt($user)], 200);

        return response($user, 200);
    }
}
