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
     * create new room
     */
    public function createRoom(Request $request)
    {
        // create room
        $room = Room::create([]);

        // create connect
        foreach ($request->users as $id) {
            DB::table('room_user')->insert([
                'room_id' => $room->id,
                'user_id' => (int)$id,
            ]);
        }

        return $room->id;
    }

    /**
     * check isset room
     */
    public function checkIssetRoom($users)
    {
        if (is_array($users)) {
            $rooms = [];

            
            /*

        SELECT room_id FROM room_users ru1
        INNER JOIN (
            SELECT room_id
            FROM room_users sub_ru2
            WHERE (sub_ru2.user_id = $user2.id)
        ) ru2 ON ru2.room_id = ru1.room_id
        WHERE user_id = $user1.id

        */

            return collect($rooms)->duplicates();
        }

        return false;
    }

     /**
     * room 
     */
    public function room(Request $request)
    {
        $room = $this->checkIssetRoom($request->users);

        if ($room->isEmpty()) {
            $room_id = $this->createRoom($request);
        } else {
            $room_id = $room;
        };

        return response()->json([
            'room_id' => $room_id,
        ]);
    }

}
