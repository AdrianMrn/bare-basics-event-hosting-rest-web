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
            if ($event) {
                $event->imageUrl = $event->getFirstMediaUrl();
                if ($event->date_end > date("Y-m-d H:i:s")) {
                    array_push($upcomingEvents, $event);
                } else {
                    array_push($pastEvents, $event);
                }
            }
        }

        return JsonResponse::create(['upcomingEvents' => $upcomingEvents, 'pastEvents' => $pastEvents]);
    }

    public function checkIfAttendingEvent($eventId, Request $request){
        $attendee = Attendee::where([['event_id', $eventId], ['user_id', $request->user()->id]])->first();

        if ($attendee) {
            return JsonResponse::create(['attending' => true, 'attendeeId' => $attendee->id]);
        } else {
            return JsonResponse::create(['attending' => false]);
        }
    }

    // This is actually used as the store function to create a new attendee
    public function update($id, Request $request){
        $attendee = new Attendee;
        $attendee->user_id = $request->user()->id;
        $attendee->event_id = $id;
        $attendee->save();

        return JsonResponse::create(['attendeeId' => $attendee->id]);
    }

    public function destroy($id, Request $request){
        Attendee::findOrFail($id)->delete();
    }

    public function getEventAttendees($id, Request $request){
        $attendees = Attendee::where('event_id', $id)->get();
        foreach ($attendees as $attendee) {
            $user = User::find($attendee->user_id);
            // User images
            $attendee->imageUrl = $user->getFirstMediaUrl();

            // User details
            $attendee->speakerName = $user->first_name . ' ' . $user->last_name;
            $attendee->email = $user->email;
        }
        return $attendees;
    }
  
}

?>