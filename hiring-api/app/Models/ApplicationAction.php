<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApplicationAction extends Model
{
    protected $fillable = ['application_id', 'user_id', 'action', 'note'];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}