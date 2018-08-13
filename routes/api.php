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
        'speakers' => 'SpeakerController',
        'sessionspeaker' => 'SessionspeakerController'
        ]);
        
    /* 
    * Other routes (not CRUD)
    */
    Route::get('/get-user-events', 'EventController@getUserEvents');
    //Route::get('/get-user-profile', 'UserController@get');
    Route::get('/get-session-speakers/{id}', 'SessionspeakerController@getSessionSpeakers');
    Route::post('/set-session-speakers/{id}', 'SessionspeakerController@setSessionSpeakers');
    
    Route::get('/eventinfo/sessions/{id}', 'SessionController@getEventSessions');
    Route::get('/eventinfo/speakers/{id}', 'SpeakerController@getEventSpeakers');
    Route::get('/eventinfo/sponsors/{id}', 'SponsorController@getEventSponsors');

});
