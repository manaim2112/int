<?php
namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Murid_history;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request) {
        if($request->get('site_setting')) {
            $session = $request->get('site_setting');
            $murid = Murid_history::where("setting_id", "=", $session->id)->count();
        }

        $blogs = Blog::with('user')->where("user_id", "=", auth()->id())->get()->all();
        // Execute the shell command to get disk space info
        $output = shell_exec('df -h');

        

        return Inertia::render("Dashboard", [
            "murid" => $murid ?? 0,
            "blogs" => $blogs,
            "diskspace" => $output
        ]);
    }

    public function runMigration(Request $request) {
        $request->validate([
            "activation_code" => "required",
        ]);


         // Run the migrations
         Artisan::call('migrate', [
            '--force' => true // Force the migration in production
        ]);


    }
}
