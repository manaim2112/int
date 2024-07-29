<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function dashboardIndex(Request $request) {
        $get = Setting::with('user')->get()->all();
        $user = User::all();
        $kelas = Kelas::all();

        return Inertia::render("Dashboard/Setting", ['data' => $get, 'user' => $user, 'kelas' => $kelas]);
    }

    public function dashboardGenerate(Request $request) {
        $request->validate([
            "semester" => "required",
            "kepala" => "required",
            "name" => "required",
            "address" => "required",
            "postCode" => "required",
            "country" => "required",
            "logo" => "required|image|mimes:jpeg,jpg,png,svg,bmp|max:1024",
            "phone" => "required",
            "email" => "required|email",
        ]);

        if($request->hasFile("logo")) {
            $logo = $request->file("logo")->store("images", "public");
        }

        Setting::create([
            "semester" => $request->input("semester"),
            "user_id" => $request->input("kepala"),
            "name" => $request->input("name"),
            "address" => $request->input("address"),
            "postal_code" => $request->input("postCode"),
            "country" => $request->input("country"),
            "phone" => $request->input("phone"),
            "email" => $request->input("email"),
            "logo" => $logo,
        ]);


        return redirect()->route('dashboard.setting');

    }

    public function dashboardKelasCreate(Request $request) {
        $request->validate([
            "name" => "required",
        ]);

        Kelas::create([
            "name" => trim($request->input('name'))
        ]);

        return redirect()->route('dashboard.setting');
    }

    public function dashboardChangeSetting(Request $request) {
        $request->validate([
            'id' => "required",
        ]);

        if($request->input('permanent')) {
            Setting::changeSetting($request->input('id'));
            $setting = Setting::with('user')->where('active', '=', true)->first();
        } else {
            $setting = Setting::with('user')->find($request->input('id'))->first();
        }

        session(["setting" => $setting]);

        return redirect()->route('dashboard.setting');
    }
}
