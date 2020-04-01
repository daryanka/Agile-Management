<?php

namespace App\Http\Middleware;

use Closure;

class RolesMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, ...$roles)
    {
        if (empty($request->user) || !$request->user) {
            return response("Unauthorized",401);
        }

        $contains = false;
        foreach ($roles as $role) {
            if ($role == $request->user->role) {
                $contains = true;
                break;
            }
        }

        if (!$contains) {
            return response("Unauthorized", 401);
        }

        return $next($request);
    }
}
