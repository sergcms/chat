<?php

namespace App\Models;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $guarded = ['id'];

    public function users()
    {
        return $this->belongsToMany('App\Models\User');
    }

    /**
     * create connect room wirh user
     */
    public function createRoomUser($users, $room_id)
    {
        foreach ($users as $id) {
            DB::table('room_user')->insert([
                'room_id' => $room_id,
                'user_id' => (int)$id,
            ]);
        }

        return true;
    }

    /**
     * get room if isset
     */
    public function getRoom($users)
    {
        $room = DB::select(DB::raw("SELECT u1.room_id FROM room_user u1 
            INNER JOIN room_user u2 ON u2.room_id = u1.room_id 
            WHERE u1.user_id = $users[0] AND u2.user_id = $users[1]"));

        if (!empty($room[0])) {
            $room_id = $room[0]->room_id;

            return $room_id;
        } 

        return false;
    }

}
