<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['blog_id', 'parent_id', 'author', 'comment'];

    // Relasi ke Blog
    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }

    // Relasi ke parent comment
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    // Relasi ke child comments
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
}
