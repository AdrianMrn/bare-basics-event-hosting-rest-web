<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Event extends Model implements HasMedia
{

    use HasMediaTrait;
    
    protected $guard_name = 'web';
    protected $table = 'events';
    public $timestamps = true;

    use SoftDeletes;

    protected $dates = ['deleted_at'];
    protected $fillable = array('name', 'slug', 'address', 'city', 'country', 'venue_name', 'description', 'date_start', 'date_end', 'owner_id', 'type', 'is_private');

}