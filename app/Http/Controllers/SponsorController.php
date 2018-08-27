<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Sponsor;
use App\Event;

class SponsorController extends Controller 
{

    public function getEventSponsors($id, Request $request){
        $sponsors = Sponsor::where('event_id', $id)->get();
        return $sponsors;
    }

    public function store(Request $request){
        if ($request->has('eventId')){
            $event = Event::findOrFail($request->eventId);
            if ($event->owner_id == $request->user()->id) {
                $sponsor = new Sponsor;
                $sponsor->name = 'Unnamed sponsor';
                $sponsor->event_id = $request->eventId;
        
                $sponsor->save();
                return $sponsor;
            }
        }
        
        abort(401);
    }

    public function update($id, Request $request){
        $validate = [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'url' => 'nullable|URL|max:500',
            'tier' => 'nullable|string|max:20'
        ];

        $valid = Validator::make($request->only(['name', 'description', 'url', 'tier']),$validate);
        
        if ($valid->fails()) {
            return  response()->json($valid->errors()->all(), 400);
        }

        $sponsor = Sponsor::findOrFail($id);
        $event = Event::findOrFail($sponsor->event_id);

        if ($event->owner_id == $request->user()->id) {
            $updatedEvent = $event->update($request->all());

            $sponsor->name = $request->name;
            $sponsor->description = $request->description;
            $sponsor->url = $request->url;
            $sponsor->tier = $request->tier;
            $sponsor->event_id = $request->event_id;
    
            $sponsor->save();
            return $sponsor;
        }
        
        abort(401);
    }

    public function destroy($id, Request $request){
        $sponsor = Sponsor::findOrFail($id);
        $event = Event::findOrFail($sponsor->event_id);

        if ($event->owner_id === $request->user()->id) {
            $sessionSpeakers = Sessionspeaker::where('session_id', $id)->delete();
            $session->delete();
            
            return JsonResponse::create(['error' => false]);
        } else {
            abort(401);
        }
    }
  
}

?>