<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_history extends Model
{
    use HasFactory;
    protected $table = 'user_histories';
    protected $fillable = ['user_id', 'setting_id', 'jabatan', 'start_date', 'end_date'];
    public $timestamps = true;


    public function user() {
        $this->belongsTo(User::class);
    }

    public function setting() {
        $this->belongsTo(Setting::class);
    }

}
