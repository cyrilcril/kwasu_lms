<?php

namespace App\Http\Middleware;


use Closure;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next){
        if ($request->user() && $request->user()->user_access_id = '100'){
            return new Response(view('unauthorized')->with('role', 'ADMINIATRATOR'));
        }
        return $next($request);
    }
}
