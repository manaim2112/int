<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = ['title', "user_id", 'slug', 'content', 'tags', 'category', 'thumbnail'];

    public $timestamps = true;

    // Relasi ke Comments
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public static function categories()  {
        $data = DB::table('blog_categories')->get()->all();
        return $data;
    }

    public static function categories_create($data) {
        $id = DB::table("blog_categories")->insertGetId($data);
        return $id;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
