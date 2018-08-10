<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Speaker;
use App\Event;

class SpeakerController extends Controller 
{

    public function getEventSpeakers($id, Request $request){
        $event = Event::find($id);
        if ($event->owner_id === $request->user()->id) {
            $speakers = Speaker::where('event_id', $id)->get();
            return $speakers;
        } else {
            abort(401);
        }
    }
  
}

?>