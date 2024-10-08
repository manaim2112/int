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
        Schema::create('transaction_types', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('setting_id');
            $table->string('name'); // e.g., "SPP", "Denda", "Donasi"
            $table->timestamps();

            $table->foreign('setting_id')->references('id')->on('settings')->onDelete('cascade');
        });
        
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('murid_id');
            $table->unsignedBigInteger('transaction_type_id');
            $table->enum('transaction_type', ['debit', 'credit', 'bill'])->default('bill');
            $table->decimal('amount', 10, 2);
            $table->date('transaction_date');
            $table->string('description')->nullable();
            $table->timestamps();
        
            $table->foreign('murid_id')->references('id')->on('murids')->onDelete('cascade');
            $table->foreign('transaction_type_id')->references('id')->on('transaction_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions_types');
        Schema::dropIfExists('transactions');

    }
};
