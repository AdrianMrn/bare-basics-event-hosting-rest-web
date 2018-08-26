<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
            $event->coords_lon = $request->coords_lon;
            $event->coords_lat = $request->coords_lat;
            
            $event->save();
            return JsonResponse::create(['error' => false, 'eventData' => $event]);
        }

        abort(401);
    }

    public function getEventsByQuery($query, Request $request){
        $events = Event::where('name', 'LIKE', '%'.$query.'%')->get();

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