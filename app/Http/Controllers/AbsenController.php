<?php

namespace App\Http\Controllers;

use App\Models\Absen;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AbsenController extends Controller
{
    public function index() {
        // Ambil Semua Guru;
        $users = User::all();
    
        $now = now()->format("Y-m-d");
        // DB::enableQueryLog();
        $absen = Absen::with('user')->findDate($now, $now)->get();
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
}
