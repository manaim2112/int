<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kelas_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("setting_id"); // Tahun Pelajaran
            $table->unsignedBigInteger('user_id'); // Wali Kelas
            $table->unsignedBigInteger('kelas_id'); // Kelas ID
            $table->string('cluster'); // Jurusan atau Penempatan;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelas_histories');
    }
};
