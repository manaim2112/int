<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_absen extends Model
{
    use HasFactory;

    protected $fillable = ['user_history_id', 'piket_user_history_id', 'status', 'jam_dinas', 'tanggal', 'keterangan'];
    public $timestamps = true;


    public function user_history() {
        $this->belongsTo(User_history::class);
    }
}
