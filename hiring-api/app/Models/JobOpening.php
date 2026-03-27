<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobOpening extends Model
{
    protected $fillable = ['title', 'description', 'requirements', 'department', 'location', 'salary_range', 'status'];

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}