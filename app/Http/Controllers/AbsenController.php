<?php

namespace App\Http\Controllers;

use App\Models\Absen;
use App\Models\User;
use App\Models\User_history;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class AbsenController extends Controller
{
    public function authRedirect(Request $request) {
        $email = $request->query("email");
        $accessToken = $request->query("accessToken");
        session(["accessToken" => $accessToken]);
        $user = User::query()->where("email", "=", $email)->get()->first();

         // Memeriksa apakah pengguna terdaftar di sistem
            $user = User::query()->where("email", "=", $email)->first();
            $setting = $request->get("site_setting");
            if (!$user) {
                return Inertia::render("Error/ErrorAbsenLogin", [
                    "message" => "Mohon Maaf, Anda tidak berhak untuk Melakukan Absensi karena tidak terdaftar di " . $setting->name,
                    "allowed" => false,
                ]);
            }
    
            $id = $user->id;
    
            // Memeriksa riwayat pengguna berdasarkan setting dan user ID
            $userHistory = User_history::query()->where("setting_id", "=", $setting->id)->where("user_id", "=", $id)->get()->pluck('jabatan');
    
            if ($userHistory->isEmpty()) {
                return Inertia::render("Error/ErrorAbsenLogin", [
                    "message" => "Mohon Maaf, Anda tidak berhak untuk Absensi karena pada tahun pelajaran " . $setting->id . "/" . ($setting->id + 1) . ", anda tidak terdaftar di " . $setting->name,
                    "allowed" => false,
                ]);
            }
    
            // Memeriksa apakah pengguna memiliki jabatan yang diizinkan
            $allowedRoles = ["administrator", "Guru Piket", "Kepala Sekolah", "Bendahara", "Operator"];
            if ($userHistory->intersect($allowedRoles)->isNotEmpty()) {
                $request->session()->regenerate();
                Auth::loginUsingId($id, true);
                return redirect()->route('absen');
            }
    
            return Inertia::render("Error/ErrorAbsenLogin", [
                "message" => "Mohon Maaf, Anda tidak berhak untuk Absensi karena anda bukan Guru Piket yang tidak terdaftar di " . $setting->name,
                "allowed" => true,
            ]);
        // return Socialite::driver('google')->redirect();
    }

    public function authCallback(Request $request) {
        return Inertia::render("AbsenCallback");
        // $query = $request->all();
        // dd($query);
        // try {
            // Mengambil pengguna dari Google
            // $user = Socialite::driver('google')->user();
            // dd($user);
            // $email = $user->getEmail();
    
            // // Mengambil pengaturan dari request
            // $setting = $request->get("site_setting");
            
            // // Memeriksa apakah pengguna terdaftar di sistem
            // $user = User::query()->where("email", "=", $email)->first();
            // if (!$user) {
            //     return Inertia::render("Error/ErrorAbsenLogin", [
            //         "message" => "Mohon Maaf, Anda tidak berhak untuk Melakukan Absensi karena tidak terdaftar di " . $setting->name,
            //         "allowed" => false,
            //     ]);
            // }
    
            // $id = $user->id;
    
            // // Memeriksa riwayat pengguna berdasarkan setting dan user ID
            // $userHistory = User_history::query()->where("setting_id", "=", $setting->id)->where("user_id", "=", $id)->get()->pluck('jabatan');
    
            // if ($userHistory->isEmpty()) {
            //     return Inertia::render("Error/ErrorAbsenLogin", [
            //         "message" => "Mohon Maaf, Anda tidak berhak untuk Absensi karena pada tahun pelajaran " . $setting->id . "/" . ($setting->id + 1) . ", anda tidak terdaftar di " . $setting->name,
            //         "allowed" => false,
            //     ]);
            // }
    
            // // Memeriksa apakah pengguna memiliki jabatan yang diizinkan
            // $allowedRoles = ["administrator", "Guru Piket", "Kepala Sekolah", "Bendahara", "Operator"];
            // if ($userHistory->intersect($allowedRoles)->isNotEmpty()) {
            //     $request->session()->regenerate();
            //     Auth::loginUsingId($id);
            //     return redirect()->route('absen');
            // }
    
            // return Inertia::render("Error/ErrorAbsenLogin", [
            //     "message" => "Mohon Maaf, Anda tidak berhak untuk Absensi karena anda bukan Guru Piket yang tidak terdaftar di " . $setting->name,
            //     "allowed" => true,
            // ]);
        // } catch (\Throwable $th) {
        //     // Menangani pengecualian
        //     return Inertia::render("Error/ErrorAbsenLogin", [
        //         "message" => "Terjadi kesalahan: " . $th->getMessage(),
        //         "allowed" => false,
        //     ]);
        // }
    }

    public function spreadsheet() {
        // $absen = Absen::with(['user', 'piket'])->get()->all();
        $absenChunks = collect(); // Mengumpulkan data

        Absen::with(['user', 'piket'])->chunk(100, function ($absens) use (&$absenChunks) {
            $absenChunks = $absenChunks->merge($absens);
        });

        return Inertia::render('AbsenReal', [
            "absen" => $absenChunks,
        ]);
    }
    
    
    public function index(Request $request) {

        // if (!Auth::check()) {
        //     return redirect()->route('absen.auth'); // Redirect to the desired route if already logged in
        // }
        $setting = $request->get("site_setting");
        // Ambil Semua Guru;
        $users = User::with(["histories" => function($query) use ($setting) {
            $query->where("setting_id", $setting->id);
        }])->where("id", "!=", 1)->get();
        $piket = $users->filter(function($user) {
            $history = collect($user->histories);
            return $history->pluck('jabatan')->intersect(["Guru Piket", "Operator", "Kepala Sekolah", "Bendahara"])->isNotEmpty();
        })->values()->toArray();

        $now = now()->format("Y-m-d");
        $date = $request->query("date");
        if($date) {
            $now = $date;
        }

        $setting = $request->get("site_setting");
        // DB::enableQueryLog();
        $absen = Absen::with('user')->findDate($now, $now)->where('setting_id', '=', $setting->id)->get();
        // dd(DB::getQueryLog());
        $setting = $request->get("site_setting");
        

        // google_client_id
        $google_client_id = env("GOOGLE_CLIENT_ID");
        $google_redirect_uri = env("GOOGLE_CALLBACK_URL");
    
        return Inertia::render("Absen", [
            "userpiket" => $piket ?? [],
            "users" => $users,
            "absen" => $absen ?? [],
            "authID" => auth()->id() ?? null,
            "google_client_id" => $google_client_id,
            "google_redirect_uri" => $google_redirect_uri
        ])->with("message", "HELLO");
    }

    public function absenPost(Request $request) {
        $request->validate([
            "piket_id" => "required",
            "user_id" => "required",
            "status" => "required",
            "tanggal" => "required",
        ]);

        $checking = Absen::query()
    ->where("user_id", "=", $request->input('user_id'))
    ->where("tanggal", "=", Carbon::parse($request->input('tanggal'))->format("Y-m-d"))
    ->get()
    ->count();

        if($checking > 0) return redirect()->route('absen')->with("message", "Sudah Terabsen");
        $absen = new Absen();
        $absen->setting_id = $request->get('site_setting')->id;
        $absen->piket_id = $request->input("piket_id");
        $absen->user_id = $request->input("user_id");
        $absen->status = $request->input("status");
        $absen->tanggal = $request->input("tanggal");
        $absen->keterangan = $request->input("keterangan") ?? null;
        $absen->jam_dinas = $request->input("jam_dinas") ?? NULL;

        if($absen->save()) {
            return redirect()->route('absen')->with("message", "Berhasil Tersimpan");
        }
        return redirect()->route('absen')->with("message", "Terjadi kesalahan saat menyimpan");
    }

    public function absenDelete(string $id, Request $request) {
        $absen = Absen::findOrFail($id);
        $date = $request->query('date');
        $absen->delete();
        if($date) {
            return redirect()->route('absen', ['date' => $date]);
        }
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
