<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\UsersRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{
    public function create(Request $request)
    {
        $room = Room::create([
            'user_id' => $request->user_id,
        ]);

        foreach ($request->users as $id) {
            UsersRoom::create([
                    'room_id' => $room->id,
                    'user_id' => $id,
                ]);
        }

        return response()->json();
    }
}
