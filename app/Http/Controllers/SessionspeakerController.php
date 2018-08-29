<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Speaker;
use App\Event;
use App\Session;
use App\User;
use App\Sessionspeaker;

class SessionspeakerController extends Controller
{

    public function getSessionSpeakers($id, Request $request){
        $speakers = Sessionspeaker::where('session_id', $id)->get();
        foreach ($speakers as $speaker) {
            $user = User::findOrFail($speaker->user_id);
            // User images
            $speaker->imageUrl = $user->getFirstMediaUrl();

            // User info
            $speaker->speakerName = $user->first_name . ' ' . $user->last_name;
            $speaker->email = $user->email;
        }
        
        return $speakers;
    }

    public function getUserSessions($id, $eventId, Request $request){
        $sessionSpeakers = Sessionspeaker::where('user_id', $id)->get();
        /* FIXME: I forgot to add event_id in the sessionSpeaker model, so we have to loop over
            all of this user's sessionSpeaker entries to figure out if they're at the event we need.
        */

        $userSessions = [];
        foreach ($sessionSpeakers as $sessionSpeaker) {
            $session = Session::find($sessionSpeaker->session_id);
            return JsonResponse::create(['session' => $session, 'eventId' => $eventId]);
            if ($session->event_id === $eventId) {
                array_push($userSessions, $session);
            }
        }

        return $userSessions;
    }
    
    public function setSessionSpeakers($sessionId, Request $request){
        $session = Session::findOrFail($sessionId);
        $event = Event::findOrFail($session->event_id);
        if ($event->owner_id === $request->user()->id) {
            // deleting all current sessionspeakers for this session
            Sessionspeaker::where('session_id', $sessionId)->delete();

            // creating the new ones
            foreach ($request->sessionSpeakers as $sessionSpeaker) {
                $speakerModel = Speaker::find($sessionSpeaker);

                $s = new Sessionspeaker;
                $s->speaker_id = $speakerModel->id;
                $s->user_id = $speakerModel->user_id;
                $s->session_id = $sessionId;

                $s->save();
            }
            
            return JsonResponse::create(['error' => false]);
        }
        
        abort(401);
    }


}
