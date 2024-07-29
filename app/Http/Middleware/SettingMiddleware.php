<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class SettingMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response|\Inertia\Response
    {

        $setting = Setting::all()->count();
        if($setting < 1) {
            return Inertia::render("Error/ErrorNoSetting");
        }
        return $next($request);
    }
}
