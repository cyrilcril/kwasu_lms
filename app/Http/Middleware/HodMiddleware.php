<?php

namespace App\Http\Middleware;
use Closure;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

class HodMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        $user = $request->user();
        if ($request->user() && $request->user()->user_access_id == '2' or $user->user_access_id == '100') {
            return $next($request);
        }else return new Response(view('unauthorized')->with('role', 'HOD'));
    }
}
