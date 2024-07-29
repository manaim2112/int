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
        Schema::create('murid_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('setting_id')->index();
            $table->unsignedBigInteger('murid_id')->index();
            $table->unsignedBigInteger('kelas_history_id')->nullable();
            $table->string('jabatan')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->timestamps();

            $table->foreign('setting_id')->references('id')->on("settings")->cascadeOnDelete();
            $table->foreign('kelas_history_id')->references('id')->on('kelas_histories')->onDelete('cascade');
            $table->foreign('murid_id')->references('id')->on('murids')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('murid_histories');
    }
};
