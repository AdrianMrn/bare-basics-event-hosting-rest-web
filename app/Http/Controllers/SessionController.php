<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Session;
use App\Event;

class SessionController extends Controller 
{

    public function getEventSessions($id, Request $request){
        $event = Event::find($id);
        if ($event->owner_id === $request->user()->id) {
            $sessions = Session::where('event_id', $id)->get();
            return $sessions;
        } else {
            abort(401);
        }
    }
  
}

?>