<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Event;

class EventController extends Controller 
{

    public function store(Request $request){
        $event = new Event;

        $event->name = 'Unnamed Event';
        $event->slug = 'unnamed-event-' . time();
        $event->owner_id = $request->user()->id;

        $event->save();
        return $event;
    }

    public function show($id, Request $request){
        $event = Event::where('slug', $id)->firstOrFail();

        if ($event->owner_id === $request->user()->id) {
            return JsonResponse::create(['error' => false, 'eventData' => $event]);
        } else {
            abort(401);
        }
    }

    public function update($id, Request $request){
        $event = Event::findOrFail($id);

        if ($event->owner_id === $request->user()->id) {
            $event->name = $request->name;
            $event->description = $request->description;
            $event->address = $request->address;
            $event->city = $request->city;
            $event->country = $request->country;
            $event->date_start = $request->date_start;
            $event->date_end = $request->date_end;
            $event->is_private = $request->is_private;
            $event->type = $request->type;
            $event->venue_name = $request->venue_name;
            
            $event->save();
            return JsonResponse::create(['error' => false, 'eventData' => $event]);
        } else {
            abort(401);
        }
    }

    public function delete(Request $request){
        // TODO: create this (in front end as well)
    }

    public function getUserEvents(Request $request){
        $events = Event::where('owner_id', $request->user()->id)->get();
        return $events;
    }

    public function linkImage($id, Request $request){
        $event = Event::findOrFail($id);

        $event->clearMediaCollection();
        $event->addMediaFromRequest('image')->toMediaCollection();
    }
  
}

?>