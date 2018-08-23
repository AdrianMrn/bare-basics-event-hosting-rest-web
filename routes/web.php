<?php

header('Access-Control-Allow-Origin:  *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, HEAD, PATCH, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

// This will route everything to the 'spa' view
Route::get('/{path?}', function () {
    return view('spa');
})->where('path', '.*');
