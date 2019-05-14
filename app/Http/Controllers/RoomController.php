<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Room;
use App\Models\User;
use App\Models\RoomUser;
use Illuminate\Http\Request;
use App\Events\MessagePushed;
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
            // get room
            $room = DB::select(DB::raw("SELECT u1.room_id FROM room_user u1 
                INNER JOIN room_user u2 ON u2.room_id = u1.room_id 
                WHERE u1.user_id = $users[0] AND u2.user_id = $users[1]"));

            if (!empty($room[0])) {
                $room_id = $room[0]->room_id;

                return $room_id;
            } 
        }

        return false;
    }

    /**
     * room 
     */
    public function room(Request $request)
    {
        $room = $this->checkIssetRoom($request->users);

        if (!$room) {
            $room_id = $this->createRoom($request);
        } else {
            $room_id = $room;
        };

        return response()->json([
            'room_id' => $room_id,
        ]);
    }

    /**
     * send message
     */
    public function sendMessage(Request $request)
    {
        // validate ??

        $message = Chat::create([
            'user_id' => $request->data['user'],
            'room_id' => $request->data['room'],
            'message' => $request->data['message'],
        ]);

        MessagePushed::dispatch($message);
        // dispatch(new MessagePushed($message));

        return response()->json($message->message, 200);
    }

    /**
     * get all messages of room
     */
    public function getMessagesOfRoom(Request $request)
    {
        $messages = Chat::where('room_id', $request->room)->get();

        return response()->json($messages, 200);
    }

}
