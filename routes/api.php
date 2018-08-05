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
Route::get('/test', 'Eventcontroller@testApi');

Route::group(['middleware' => ['auth:api']], function () {

    /*
     * Event routes
     */
Route::get('/events', 'EventController@get');
Route::put('/events', 'EventController@create');
Route::post('/events', 'EventController@update');
Route::delete('/events', 'EventController@delete');

    /*
     * Session routes
     */
Route::get('/sessions', 'EventController@get');
Route::put('/sessions', 'EventController@create');
Route::post('/sessions', 'EventController@update');
Route::delete('/sessions', 'EventController@delete');

    /*
     * Attendee routes
     */

Route::get('/attendees', 'EventController@get');
Route::put('/attendees', 'EventController@create');
Route::post('/attendees', 'EventController@update');
Route::delete('/attendees', 'EventController@delete');

    /*
     * Speaker routes
     */

Route::get('/speakers', 'EventController@get');
Route::put('/speakers', 'EventController@create');
Route::post('/speakers', 'EventController@update');
Route::delete('/speakers', 'EventController@delete');

});



