<?php

namespace App\Http\Controllers;

use App\Models\Absen;
use App\Models\Kelas;
use App\Models\User;
use App\Models\User_history;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    //

    public function dashboardIndex(Request $request) {
        // Ambil setting id dari request
        $setting = $request->get('site_setting');
        $settingId = $setting->id;
    
        // Ambil data user beserta histories yang sesuai dengan setting id yang berlaku
        $guru = User::with(['histories' => function($query) use ($settingId) {
            $query->where('setting_id', $settingId);
        }])->get();

        $kelas = Kelas::all();

    
        // Render dengan Inertia
        return Inertia::render('Dashboard/User', [
            'users' => $guru,
            'kelas' => $kelas,
        ]);
    }
    

    public function dashboardCreate(Request $request) {
        $request->validate([
            "nid" => "required",
            "email" => "required|email",
            "name" => "required",
            "password" => "required",
            'validation' => "required"
        ]);


        $t = new User();
        $t->nid = trim($request->input('nid'));
        $t->email = trim($request->input('email'));
        $t->name = trim($request->input('name'));
        $t->password = Hash::make(trim($request->input('password')));
        $t->save();

        return redirect()->route('dashboard.user');
    }



    public function dashboardUpdate(string $id, Request $request) {
        $request->validate([
            "nid" => "required",
            "email" => "required|email",
            "name" => "required",
        ]);

        $user = User::where('id', $id);

        $user->nid = trim($request->input('nid'));
        $user->name = trim($request->input('name'));
        $user->email = trim($request->input('email'));

        if($user->touch()) {
            return redirect()->route('dashboard.user');
        }
        return redirect()->route('dashboard.user');
    }

    public function dashboardUpdateJabatan(string $id, Request $request) {
        $request->validate([
            "jabatan" => "required",
        ]);

        $setting =  $request->get('site_setting');

        // Check di histories
        User_history::with('user')->updateOrCreate([
            'jabatan' => trim($request->input('jabatan')),
            'user_id' => $id
        ], [
            "jabatan" => trim($request->input('jabatan')),
            "start_date" => trim(now()),
            "user_id" => $id,
            "setting_id" => $setting->id
        ]);

        return redirect()->route('dashboard.user');
    }

    public function dashboardDeleteJabatan(string $id, Request $request) {
        $request->validate([
            "jabatan" => "required",
        ]);


        $jabatan = $request->input("jabatan");

        User_history::whereIn("id", $jabatan)->delete();

        return redirect()->route('dashboard.user');
    }

    public function dashboardAbsen(Request $request) {
        $setting = $request->get("site_setting");
        // Mendapatkan tanggal saat ini
         $today = \Carbon\Carbon::today('Asia/Jakarta');

        if($request->isMethod("post")) {
            $request->validate([
                "user_id" => "required",
                "status" => "required",
            ]);

            // Mencari atau membuat absen
            $absen = Absen::where('user_id', $request->input('user_id'))
                            ->whereDate('created_at', $today)
                            ->first();
            if ($absen) {
                // Update jika sudah ada
                $absen->status = $request->input('status');
                $absen->save();
            } else {
                // Buat baru jika belum ada
                Absen::create([
                    'setting_id' => $setting->id,
                    'user_id' => $request->input('user_id'),
                    'status' => $request->input('status'),
                ]);
            }

            return redirect()->route('dashboard.absen');
        }
        $absens = Absen::where('setting_id', $setting->id)->where('user_id', auth()->id())->whereDate('created_at', $today)->get();
        return Inertia::render("Dashboard/Absen", [
            "absens" => $absens,
        ]);
    }
}
