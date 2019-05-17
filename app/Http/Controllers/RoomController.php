<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Room;
use App\Models\User;
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

        $room_user = new Room();
        $room_user->createRoomUser($request->users, $room->id);

        return $room->id;
    }

    /**
     * check isset room
     */
    public function checkIssetRoom($users)
    {
        if (is_array($users)) {
            $room = new Room();
            $room_id = $room->getRoom($users);

            return $room_id;
        }

        return false;
    }

    /**
     * room 
     */
    public function room(Request $request)
    {
        $room_id = $this->checkIssetRoom($request->users);

        if (!$room_id) {
            $room_id = $this->createRoom($request);
        } 

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

        if (isset($request->data['room'])) {
            $message = Chat::create([
                'user_id' => $request->data['user'],
                'room_id' => $request->data['room'],
                'message' => $request->data['message'],
            ]);
        } else {
            $message = Chat::create([
                'user_id' => $request->data['user'],
                'message' => $request->data['message'],
            ]);
        }

        // dispatch message
        MessagePushed::dispatch($message);

        return response()->json($message->message, 200);
    }

    /**
     * get all messages of room
     */
    public function getMessagesOfRoom(Request $request)
    {
        if (isset($request->room)) {
            $messages = Chat::where('room_id', $request->room)->get();
        } else {
            $messages = Chat::where('room_id', NULL)->get();
        }

        return response()->json($messages, 200);
    }
}
