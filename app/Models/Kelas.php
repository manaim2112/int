<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Kelas extends Model
{
    use HasFactory;

    protected $table = 'kelas';
    protected $fillable = ['name', 'sorter'];
    public $timestamps = false;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            // Mengambil nilai sorter terbesar yang ada saat ini dan menambahkannya dengan 1
            $maxSorter = Kelas::max('sorter');
            $model->sorter = $maxSorter ? $maxSorter + 1 : 1;
        });
    }

    public function increase()
    {
        // Mencari kelas yang memiliki sorter lebih besar
        $nextKelas = Kelas::where('sorter', '>', $this->sorter)
            ->orderBy('sorter', 'asc')
            ->first();

        if ($nextKelas) {
            // Tukar nilai sorter
            DB::transaction(function () use ($nextKelas) {
                $tempSorter = $this->sorter;
                $this->sorter = $nextKelas->sorter;
                $nextKelas->sorter = $tempSorter;

                $this->save();
                $nextKelas->save();
            });
        }
    }

    public function decrease()
    {
        // Mencari kelas yang memiliki sorter lebih kecil
        $prevKelas = Kelas::where('sorter', '<', $this->sorter)
            ->orderBy('sorter', 'desc')
            ->first();

        if ($prevKelas) {
            // Tukar nilai sorter
            DB::transaction(function () use ($prevKelas) {
                $tempSorter = $this->sorter;
                $this->sorter = $prevKelas->sorter;
                $prevKelas->sorter = $tempSorter;

                $this->save();
                $prevKelas->save();
            });
        }
    }

}
