<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Sponsor;
use App\Event;

class SponsorController extends Controller 
{

    public function getEventSponsors($id, Request $request){
        $sponsors = Sponsor::where('event_id', $id)->get();
        foreach ($sponsors as $sponsor) {
            $sponsor->imageUrl = $sponsor->getFirstMediaUrl();
        }
        return $sponsors;
    }

    public function store(Request $request){
        if ($request->has('eventId')){
            $event = Event::findOrFail($request->eventId);
            if ($event->owner_id == $request->user()->id) {
                $sponsor = new Sponsor;
                $sponsor->name = 'Unnamed sponsor';
                $sponsor->tier = 'other';
                $sponsor->description = '';
                $sponsor->url = '';
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
            $sponsor->name = $request->name;
            $sponsor->description = $request->description;
            $sponsor->tier = $request->tier;
            /* This is unecessary and fixed in the latest migration (not run on prod as of 28/8) */
            if ($request->url) {
                $sponsor->url = $request->url;
            } else {
                $sponsor->url = '';
            }
    
            return JsonResponse::create(['error' => false]);
        }
        
        abort(401);
    }

    public function destroy($id, Request $request){
        $sponsor = Sponsor::findOrFail($id);
        $event = Event::findOrFail($sponsor->event_id);

        if ($event->owner_id === $request->user()->id) {
            $sponsor->delete();
            
            return JsonResponse::create(['error' => false]);
        } else {
            abort(401);
        }
    }

    public function linkImage($id, Request $request){
        $validate = [
            'image' => 'required|dimensions:max_width=1240,max_height=1240|max:10240'
        ];

        $valid = Validator::make($request->only(['image']),$validate);
        
        if ($valid->fails()) {
            return  response()->json($valid->errors()->all(), 400);
        }

        $sponsor = Sponsor::findOrFail($id);
        $event = Event::findOrFail($sponsor->event_id);

        if ($event->owner_id === $request->user()->id) {
            $sponsor->clearMediaCollection();
            $sponsor->addMediaFromRequest('image')->toMediaCollection();

            return JsonResponse::create(['error' => false]);
        }

        abort(401);
    }
  
}

?>