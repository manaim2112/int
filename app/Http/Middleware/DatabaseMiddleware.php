<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class DatabaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response|\Inertia\Response
    {
       
        if(!Schema::hasTable("migrations")) {
            return Inertia::render('Error/ErrorMigration');
        }

        // Check if the 'settings' table exists
        if (Schema::hasTable('settings')) {
            if (!session()->has('site_setting')) {
                if (Setting::count() > 0) {
                    $setting = Setting::with('user')->where("active", "=", true)->first();
                    if(!$setting) {
                        $setting = Setting::with('user')->latest()->first();
                    }
                } else {
                    $setting = null;
                }
            } else {
                $setting = json_decode(session()->get('site_setting'));
            }
            
            Inertia::share('setting', $setting);
            $request->attributes->add(['site_setting' => $setting]);
        }
        return $next($request);
    }
}
