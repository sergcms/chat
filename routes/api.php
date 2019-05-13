<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/', 'SinglePageController@index')->where('any', '.*');

Route::post('chat', 'ChatController@send')->middleware(['jwt.verify']);
Route::post('room', 'RoomController@room')->middleware(['jwt.verify']);
Route::post('message', 'RoomController@sendMessage')->middleware(['jwt.verify']);
Route::post('messages', 'RoomController@getMessagesOfRoom')->middleware(['jwt.verify']);
Route::post('users', 'AuthController@getUsers')->middleware(['jwt.verify']);

Route::group([ 'middleware' => 'api', 'prefix' => 'auth' ], function ($router) 
{
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('register', 'AuthController@register');
    Route::post('user', 'AuthController@getAuthenticatedUser');
    // Route::post('refresh', 'AuthController@refresh');
});
