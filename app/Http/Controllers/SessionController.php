<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Session;
use App\Event;
use App\Sessionspeaker;

class SessionController extends Controller 
{

    public function store(Request $request){
        if ($request->has('eventId')){
            $event = Event::findOrFail($request->eventId);
            if ($event->owner_id == $request->user()->id) {
                $session = new Session;
                $session->event_id = $request->input('eventId');
                $session->name = 'Unnamed Session';
                $session->type = 0;
        
                $session->save();
                return $session;
            }
        }
        
        abort(401);
    }

    public function update($id, Request $request){
        $validate = [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date'];

        $valid = Validator::make($request->only(['name', 'description', 'date_start', 'date_end']),$validate);
        
        if ($valid->fails()) {
            return  response()->json($valid->errors()->all(), 400);
        }

        /* TODO: also validate that date_start isn't before event's date_start and date_end etc etc */

        $session = Session::findOrFail($id);
        $event = Event::findOrFail($session->event_id);

        if ($event->owner_id === $request->user()->id) {
            $session->name = $request->name;
            $session->description = $request->description;
            $session->date_start = $request->date_start;
            $session->date_end = $request->date_end;
            $session->type = $request->type;

            $session->save();
            return JsonResponse::create(['error' => false, 'sessionData' => $session]);
        } else {
            abort(401);
        }
    }

    public function destroy($id, Request $request){
        $session = Session::findOrFail($id);
        $event = Event::findOrFail($session->event_id);

        if ($event->owner_id === $request->user()->id) {
            $sessionSpeakers = Sessionspeaker::where('session_id', $id)->delete();
            $session->delete();
            
            return JsonResponse::create(['error' => false]);
        } else {
            abort(401);
        }
    }

    public function getEventSessions($id, Request $request){
        $sessions = Session::where('event_id', $id)->orderBy('date_start')->get();
        return $sessions;
    }
  
}

?>