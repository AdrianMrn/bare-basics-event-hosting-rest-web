<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Speaker;
use App\Event;
use App\Session;
use App\User;

class SpeakerController extends Controller 
{

    public function store(Request $request){
        // TODO: Gets an email, should check if user already exists etc

        if ($request->has('eventId')){
            $event = Event::findOrFail($request->input('eventId'));
            if ($event->owner_id === $request->user()->id) {
                $speaker = new Speaker;
                $speaker->event_id = $request->input('eventId');
        
                $speaker->save();
                return $speaker;
            }
        }

        abort(401);
    }

    public function show($id, Request $request){
        $speaker = Speaker::findOrFail($id);
        $event = Event::findOrFail($speaker->event_id);
        if ($event->owner_id === $request->user()->id) {
            $user = User::where('id', $speaker->user_id)->first();

            return $user;
        }

        abort(401);
    }

    public function getEventSpeakers($id, Request $request){
        $event = Event::findOrFail($id);
        if ($event->owner_id === $request->user()->id) {
            $speakers = Speaker::where('event_id', $id)->get();
            foreach ($speakers as $speaker) {
                $user = User::findOrFail($speaker->user_id);
                $speaker->speakerName = $user->first_name . ' ' . $user->last_name;
            }
            return $speakers;
        }
        
        abort(401);
    }
  
}

?>