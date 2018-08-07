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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/user/register', 'Auth\ApiRegisterController@register');
Route::post('/user/authenticate', 'Auth\ApiLoginController@authenticate');
Route::post('/user/refresh', 'Auth\ApiLoginController@refreshToken');

Route::group(['middleware' => ['auth:api']], function () {

    Route::resources([
        'events' => 'EventController',
        'sessions' => 'SessionController',
        'attendees' => 'AttendeeController',
        'speakers' => 'SpeakersController'
    ]);

    /* 
    * Other routes (not CRUD)
    */
    Route::get('/getuserevents', 'EventController@getUserEvents');
    Route::get('/getuserprofile', 'UserController@get');

});
