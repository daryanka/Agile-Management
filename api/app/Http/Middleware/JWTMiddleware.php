<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Exception;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;

class JWTMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header("token");

        if (!$token) {
            return response("Unauthorized", 401);
        }

        try {
            $credentials = JWT::decode($token, env("JWT_SECRET"), ["HS256"]);
        } catch (ExpiredException $e) {
            return response("Token expired", 400);
        } catch (Exception $e) {
            return response("Unauthorized", 401);
        }

        $user = User::findOrFail($credentials->sub);

        $request->user = $user;
        return $next($request);
    }
}
