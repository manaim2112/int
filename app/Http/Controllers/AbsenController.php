<?php

namespace App\Http\Controllers;

use App\Models\Absen;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AbsenController extends Controller
{
    public function index(Request $request) {
        // Ambil Semua Guru;
        $users = User::all();
    
        $now = now()->format("Y-m-d");
        $setting = $request->get("site_setting");
        // DB::enableQueryLog();
        $absen = Absen::with('user')->findDate($now, $now)->where('setting_id', '=', $setting->id)->get();
        // dd(DB::getQueryLog());
    
        return Inertia::render("Absen", [
            "users" => $users,
            "absen" => $absen ?? []
        ]);
    }

    public function absenPost(Request $request) {
        $request->validate([
            "piket_id" => "required",
            "user_id" => "required",
            "status" => "required",
            "tanggal" => "required",
        ]);

        $absen = new Absen();
        $absen->setting_id = $request->get('site_setting')->id;
        $absen->piket_id = $request->input("piket_id");
        $absen->user_id = $request->input("user_id");
        $absen->status = $request->input("status");
        $absen->tanggal = $request->input("tanggal");
        $absen->keterangan = $request->input("keterangan") ?? null;
        $absen->jam_dinas = $request->input("jam_dinas") ?? NULL;

        if($absen->save()) {
            return redirect()->route('absen');
        }
        return redirect()->route('absen');
    }

    public function absenDelete(string $id, Request $request) {
        $absen = Absen::findOrFail($id);

        $absen->delete();

        return redirect()->route('absen');
    }

    public function check(Request $request) {
        $startDate = $request->query("start_date", now()->format('Y-m-d'));
        $endDate =$request->query("end_date", now()->format('Y-m-d'));

        $setting = $request->get("site_setting");
        // DB::enableQueryLog();
        $absen = Absen::with('user')->findDate($startDate, $endDate)->where('setting_id', '=', $setting->id)->get();


        return Inertia::render("AbsenCheck", [
            "absen" => $absen
        ]);
    }

    public function getUser() {
        $users = User::all();

        return response()->json([
            "status" => "success",
            "data" => $users
        ]);
    }

    public function getAbsen(Request $request) {
        $now = now()->format("Y-m-d");
        $setting = $request->get("site_setting");
        // DB::enableQueryLog();
        $absen = Absen::with('user')->findDate($now, $now)->where('setting_id', '=', $setting->id)->get();
        // dd(DB::getQueryLog());

        return response()->json($absen);
    }

    public function postAbsen(Request $request) {
        $request->validate([
            "piket_id" => "required",
            "user_id" => "required",
            "status" => "required",
            "tanggal" => "required",
        ]);

        $absen = new Absen();
        $absen->setting_id = $request->get('site_setting')->id;
        $absen->piket_id = $request->input("piket_id");
        $absen->user_id = $request->input("user_id");
        $absen->status = $request->input("status");
        $absen->tanggal = $request->input("tanggal");
        $absen->keterangan = $request->input("keterangan") ?? null;
        $absen->jam_dinas = $request->input("jam_dinas") ?? NULL;

        if($absen->save()) {
            return response()->json([
                "status" => "success",
            ]);
        }
        return response()->json([
            "status" => "failed"
        ]);
    }
}
