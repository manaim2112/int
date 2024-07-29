<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absen extends Model
{
    use HasFactory;

    protected $fillable = ['setting_id', 'user_id', 'piket_id', 'status', 'jam_dinas', 'tanggal', 'keterangan'];
    public $timestamps = true;



    public function user() {
        $this->belongsTo(User::class);
    }
}
