<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Murid_history extends Model
{
    use HasFactory;
    protected $fillable = ['murid_id', 'setting_id', 'kelas_history_id', 'kelas', 'start_date', 'end_date', 'jabatan'];


    protected $table = 'murid_histories';


    public function kelas_history() {
        $this->belongsTo(Kelas_history::class);
    }
    
    public function murid() {
        $this->belongsTo(Murid::class);
    }

    public function setting() {
        $this->belongsTo(Setting::class);
    }

    public function user() {
        $this->belongsTo(User::class);
    }
}
