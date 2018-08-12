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

    public function getEventSpeakers($id, Request $request){
        $event = Event::find($id);
        if ($event->owner_id === $request->user()->id) {
            $speakers = Speaker::where('event_id', $id)->get();
            return $speakers;
        } else {
            abort(401);
        }
    }

    public function getSessionSpeakers($id, Request $request){
        $session = Session::find($id);
        $event = Event::find($session->event_id);
        if ($event->owner_id === $request->user()->id) {
            $speakers = Speaker::where('session_id', $id)->get();
            foreach ($speakers as $speaker) {
                $user = User::find($speaker->user_id);
                $speaker->speakerName = $user->first_name . ' ' . $user->last_name;
            }
            return $speakers;
        } else {
            abort(401);
        }
    }
  
}

?>