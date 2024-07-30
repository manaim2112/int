<?php

use App\Http\Controllers\AbsenController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MuridController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\SettingMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::domain("absen.mtssupel.sch.id")->group(function () {
    Route::get("/", [AbsenController::class, 'index'])->name('absen');
    Route::post("/", [AbsenController::class, 'absenPost'])->name('absen.post');
    Route::post("{id}/delete", [AbsenController::class, 'absenDelete'])->name('absen.delete');
});

// Route::prefix("absen")->group(function () {
//     Route::get("/", [AbsenController::class, 'index'])->name('absen');
//     Route::post("/", [AbsenController::class, 'absenPost'])->name('absen.post');
//     Route::post("{id}/delete", [AbsenController::class, 'absenDelete'])->name('absen.delete');
// });


Route::middleware(SettingMiddleware::class)->get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::prefix("/dashboard")->middleware(['auth', 'verified'])->group(function () {

    Route::get("", [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix("blog")->group(function() {
        Route::get("", [BlogController::class, 'dashboardIndex'])->name('dashboard.blog');
        Route::get("/create", [BlogController::class, 'dashboardCreate'])->name('dashboard.blog.create');
        Route::post("/create", [BlogController::class, 'dashboardCreate'])->name('dashboard.blog.create.post');
        Route::get("/id/{id}", [BlogController::class, 'dashboardUpdate'])->name('dashboard.blog.update');
        Route::post("/id/{id}", [BlogController::class, 'dashboardUpdate'])->name('dashboard.blog.update.post');
        Route::delete("/id/{id}", [BlogController::class, 'dashboardUpdate'])->name('dashboard.blog.update.delete');
        Route::post("/categories", [BlogController::class, 'createCategory'])->name('dashboard.blog.categories.post');
    });

    Route::prefix("murid")->middleware(SettingMiddleware::class)->group(function() {
        Route::get('', [MuridController::class, 'dashboardIndex'])->name('dashboard.murid');
        Route::post('/data', [MuridController::class, 'dashboardData'])->name('dashboard.murid.post');
        Route::post('/data/create', [MuridController::class, 'dashboardDataCreate'])->name('dashboard.murid.create.post');
        Route::post('/data/id/{id}/update', [MuridController::class, 'dashboardDataUpdate'])->name('dashboard.murid.update.post');
    });

    Route::prefix('guru')->middleware(SettingMiddleware::class)->group(function() {
        Route::get('', [UserController::class, 'dashboardIndex'])->name('dashboard.user');
        Route::post('/create', [UserController::class, 'dashboardCreate'])->name('dashboard.user.create.post');
        Route::post('/id/{id}/update', [UserController::class, 'dashboardUpdate'])->name('dashboard.user.update.post');
        Route::post('/id/{id}/update/jabatan', [UserController::class, 'dashboardUpdateJabatan'])->name('dashboard.user.update.jabatan.post');
        Route::post('/id/{id}/delete/jabatan', [UserController::class, 'dashboardDeleteJabatan'])->name('dashboard.user.delete.jabatan.post');
    });

    Route::prefix('absen')->group(function () {
        Route::get('', [UserController::class, 'dashboardAbsen'])->name('dashboard.absen');
        Route::post('', [UserController::class, 'dashboardAbsen'])->name('dashboard.absen.post');
    });

    Route::get("settings", [SettingController::class, 'dashboardIndex'])->name("dashboard.setting");
    Route::post("settings/generate", [SettingController::class, 'dashboardGenerate'])->name('dashboard.setting.post');
    Route::post("settings/kelas", [SettingController::class, 'dashboardKelasCreate'])->name('dashboard.setting.kelas.create.post');
    Route::post("settings/change", [SettingController::class, 'dashboardChangeSetting'])->name('dashboard.setting.change.post');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix("blog")->middleware(SettingMiddleware::class)->group(function() {
    Route::get("/", [BlogController::class, 'index'])->name("blog");
    Route::get("/{slug}", [BlogController::class, 'slug'])->name('blog.slug');
    Route::post("/{slug}/comment", [BlogController::class, 'storeComment'])->name('blog.comment');
});


require __DIR__.'/auth.php';
