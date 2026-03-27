<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'job_opening_id', 'full_name', 'email', 'phone',
        'city', 'college', 'graduation_year',
        'resume_path', 'cover_letter', 'status',
    ];

    public function jobOpening()
    {
        return $this->belongsTo(JobOpening::class);
    }

    public function actions()
    {
        return $this->hasMany(ApplicationAction::class);
    }
}