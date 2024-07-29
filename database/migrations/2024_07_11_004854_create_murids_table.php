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
        Schema::create('murids', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nisn')->unique();
            $table->string('password');
            $table->decimal('saldo', 15, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('kelas', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer("sorter");
        });

        Schema::create('mapels', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('murids');
        Schema::dropIfExists('kelas');
    }
};
