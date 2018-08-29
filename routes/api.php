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
        'sessionspeaker' => 'SessionspeakerController',
        'users' => 'UserController',
        'sponsors' => 'SponsorController',
        ]);
        
    /* 
    * Other routes (not CRUD)
    */
    Route::get('/get-user-events', 'EventController@getUserEvents');
    Route::get('/get-user-profile/{id}', 'UserController@getUserProfile');
    Route::get('/get-my-profile', 'UserController@getMyProfile');
    Route::get('/get-session-speakers/{id}', 'SessionspeakerController@getSessionSpeakers');
    Route::post('/set-session-speakers/{id}', 'SessionspeakerController@setSessionSpeakers');
    
    Route::get('/query-events/{query}', 'EventController@getEventsByQuery');
    Route::get('/check-if-attending-event/{eventId}', 'AttendeeController@checkIfAttendingEvent');

    Route::post('/update-profile-image', 'UserController@updateImage');

    Route::post('/events/link-image/{id}', 'EventController@linkImage');
    Route::post('/sponsors/link-image/{id}', 'SponsorController@linkImage');
    
    Route::get('/get-attending-events', 'AttendeeController@getAttendingEvents');
    Route::get('/get-user-sessions/{userId}/{eventId}', 'SessionspeakerController@getUserSessions');
    Route::get('/get-next-ten-events', 'EventController@getNextTenEvents');
    
    Route::get('/eventinfo/sessions/{id}', 'SessionController@getEventSessions');
    Route::get('/eventinfo/speakers/{id}', 'SpeakerController@getEventSpeakers');
    Route::get('/eventinfo/sponsors/{id}', 'SponsorController@getEventSponsors');
    Route::get('/eventinfo/attendees/{id}', 'AttendeeController@getEventAttendees');

});
