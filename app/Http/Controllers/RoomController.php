<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\User;
use App\Models\RoomUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{
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

            foreach ($users as $id) {
                $roomsCollection = User::findOrFail($id)->rooms;

                foreach ($roomsCollection as $room) {
                    $rooms[] = $room->id;
                }
            }

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
            foreach ($room as $value) {
                $room_id = $value; 
            }
        };

        return response()->json([
            'room' => $room_id,
        ]);
    }
}
