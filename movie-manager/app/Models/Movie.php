<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = ['title', 'genre', 'release_year', 'director', 'banner_url', 'stars', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
