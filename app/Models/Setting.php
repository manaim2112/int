<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    public $timestamps = true;
    protected $fillable = ["semester", "user_id","active", "name", "address", "postal_code", "country", "logo", "phone", "email", "content"];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public static function changeSetting(string $id) {
       // Update all records to set 'active' to false
       self::query()->update(['active' => false]);

       // Update the specified record to set 'active' to true
       self::query()->where('id', $id)->update(['active' => true]);
    }

    // Method to get the current active setting
    public static function getActiveSetting()
    {
        return self::where('active', 1)->first();
    }
}
