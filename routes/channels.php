<?php

use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('room.{room_id}', function ($user, $room_id) {
    Log::info('Showing user profile for user: ');

    Log::debug(['user' => $user, 'room_id' => $room_id, 'prava' => $user->rooms->contains($room_id) ]);

    return $user->rooms->contains($room_id);
});

Broadcast::channel('laravel_database_room.{room_id}', function ($user, $room_id) {
    Log::info('Showing user profile for user: ');
     
    Log::debug('message', ['user' => $user, 'room_id' => $room_id, 'prava' => $user->rooms->contains($room_id) ]);

    return $user->rooms->contains($room_id);
});

// Broadcast::channel('chat', function () {
//     return true;
// });