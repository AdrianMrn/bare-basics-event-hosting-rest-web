<?php

// This will route everything to the 'spa' view
Route::get('/{path?}', function () {
    return view('spa');
})->where('path', '.*');
