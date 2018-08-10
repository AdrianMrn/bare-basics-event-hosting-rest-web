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
        return JsonResponse::create(['test' => 'hello world', 200, 'id' => $id, 'data' => $request->all()]);
    }

    public function delete(Request $request){

    }

    public function getUserEvents(Request $request){
        $events = Event::where('owner_id', $request->user()->id)->get();
        return $events;
    }
  
}

?>