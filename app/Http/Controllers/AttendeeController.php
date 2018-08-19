<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Speaker;
use App\Event;
use App\Session;
use App\Sessionspeaker;
use App\User;
use App\Attendee;

class AttendeeController extends Controller 
{

    public function getAttendingEvents(Request $request){
        $attModels = Attendee::where('user_id', $request->user()->id)->get();

        $upcomingEvents = [];
        $pastEvents = [];

        foreach ($attModels as $attMod) {
            $event = Event::find($attMod->event_id);
            if ($event->date_end > date("Y-m-d H:i:s")) {
                array_push($upcomingEvents, $event);
            } else {
                array_push($pastEvents, $event);
            }
        }

        return JsonResponse::create(['upcomingEvents' => $upcomingEvents, 'pastEvents' => $pastEvents]);
    }

    public function create(Request $request){

    }

    public function get(Request $request){

    }

    public function update(Request $request){

    }

    public function delete(Request $request){

    }
  
}

?>