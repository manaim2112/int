<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = ['murid_id', 'transaction_type_id', 'transaction_type', 'amount', 'transaction_date', 'description'];

    public static function boot()
    {
        parent::boot();

        static::saving(function ($transaction) {
            $murid = Murid::find($transaction->murid_id);

            if ($transaction->transaction_type == 'debit') {
                $murid->saldo -= $transaction->amount;
            } elseif ($transaction->transaction_type == 'credit') {
                $murid->saldo += $transaction->amount;
            }

            $murid->save();
        });
    }
}
