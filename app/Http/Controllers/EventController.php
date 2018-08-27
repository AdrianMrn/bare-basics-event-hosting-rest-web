<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Event;
use App\Attendee;

class EventController extends Controller 
{

    public function store(Request $request){
        $event = new Event;
        $event->name = 'Unnamed Event';
        $event->slug = time();
        $event->owner_id = $request->user()->id;
        $event->save();

        // When creating an event, the owner should automatically become an attendee
        $attendee = new Attendee;
        $attendee->user_id = $request->user()->id;
        $attendee->event_id = $event->id;
        $attendee->save();

        return $event;
    }

    public function show($id, Request $request){
        $event = Event::where('slug', $id)->firstOrFail();
        $event->imageUrl = $event->getFirstMediaUrl();

        return JsonResponse::create(['error' => false, 'eventData' => $event]);
    }

    public function update($id, Request $request){
        $validate = [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'date_start' => 'required|date',
            'date_end' => 'required|date'];

        $valid = Validator::make($request->only(['name', 'description', 'date_start', 'date_end']),$validate);
        
        if ($valid->fails()) {
            return  response()->json($valid->errors()->all(), 400);
        }


        $event = Event::findOrFail($id);

        if ($event->owner_id === $request->user()->id) {
            $updatedEvent = $event->update($request->all());
            
            return JsonResponse::create(['error' => false, 'eventData' => $updatedEvent]);
        }

        abort(401);
    }

    public function getEventsByQuery($query, Request $request){
        $events = Event::where('name', 'LIKE', '%'.$query.'%')->whereNotNull('date_start')->get();

        foreach ($events as $event) {
            $event->imageUrl = $event->getFirstMediaUrl();
        }

        return $events;
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
        foreach ($events as $event) {
            $event->imageUrl = $event->getFirstMediaUrl();
        }

        return $events;
    }

    public function linkImage($id, Request $request){
        $validate = [
            'image' => 'required|dimensions:max_width=500,max_height=500|max:10240'
        ];

        $valid = Validator::make($request->only(['image']),$validate);
        
        if ($valid->fails()) {
            return  response()->json($valid->errors()->all(), 400);
        }

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