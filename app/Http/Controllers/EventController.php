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
        $event->imageUrl = $event->getMedia()[0];
        return ($event->imageUrl);
        if (isset($event->imageUrl)) {
            $event->imageUrl = $event->imageUrl->getUrl();
        }

        return JsonResponse::create(['error' => false, 'eventData' => $event]);
    }

    public function update($id, Request $request){
        $event = Event::findOrFail($id);
        
        /* TODO: maybe some validation like no 1000 character event names etc, same for profile, sessions and sponsors */

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
        }

        abort(401);
    }

    public function destroy($id, Request $request){
        $event = Event::findOrFail($id);

        if ($event->owner_id === $request->user()->id) {
            $event->delete();
            return JsonResponse::create(['error' => false]);
        }

        abort(401);
    }

    public function getUserEvents(Request $request){
        $events = Event::where('owner_id', $request->user()->id)->get();
        return $events;
    }

    public function linkImage($id, Request $request){
        $event = Event::findOrFail($id);

        if ($event->owner_id === $request->user()->id) {
            $event->clearMediaCollection();
            $event->addMediaFromRequest('image')->toMediaCollection();

            return JsonResponse::create(['error' => false]);
        }

        abort(401);
    }
  
}

?>