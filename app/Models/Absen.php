<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absen extends Model
{
    use HasFactory;

    protected $fillable = ['setting_id', 'user_id', 'piket_id', 'status', 'masuk', 'pulang', 'jam_dinas', 'tanggal', 'keterangan'];
    public $timestamps = true;


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $activeSetting = \App\Models\Setting::getActiveSetting();
            if ($activeSetting) {
                $model->setting_id = $activeSetting->id;
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Find absences within a specific date range.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $firstDate
     * @param string $lastDate
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFindDate($query, $firstDate, $lastDate)
    {
        return $query->whereBetween('tanggal', [$firstDate, $lastDate]);
    }
}
