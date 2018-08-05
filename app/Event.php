<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model 
{
    protected $guard_name = 'web';
    protected $table = 'events';
    public $timestamps = true;

    use SoftDeletes;

    protected $dates = ['deleted_at'];
    protected $fillable = array('name', 'slug', 'address', 'city', 'country', 'venue_name', 'description', 'date_start', 'date_end', 'owner_id', 'type', 'is_private');

}