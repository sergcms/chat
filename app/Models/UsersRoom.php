<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsersRoom extends Model
{
    protected $fillable = [
        'user_id',
        'room_id',
    ];
}
