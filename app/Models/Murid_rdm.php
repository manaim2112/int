<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Murid_rdm extends Model
{
    use HasFactory;

    protected $connection = 'rdm';
    protected $table = 'e_siswa';

    protected $fillable = [
        "siswa_nis",
        "siswa_nisn",
        "siswa_nama",
        "tingkat_id",
        "kelas_id",
        "siswa_gender",
        "siswa_tempat",
        "siswa_tgllahir",
        "siswa_alamat",
        "nama_ayah",
        "nama_ibu",
        "pekerjaan_ayah",
        "pekerjaan_ibu",
        "nik_ayah",
        "nik_ibu",
        "alamat_ortu",
        "nama_wali",
        "alamat_wali",
        "tahun_ajaran",
        "siswa_anakke",
        "sekolah_asal",
        "siswa_telpon",
        "telpon_ortu",
        "telpon_wali",
        "tanggal_terima",
        "siswa_kelasterima",
        "siswa_alasan_mutasi",
        "siswa_tahun_mutasi",
        "siswa_semster_mutasi",
        "siswa_emis"
    ];

    protected $cast = [
        "password",
        "lembaga_id"
    ];

    public static function getWithTingkat(string $tingkat) {

    }
}
