<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

use App\Speaker;
use App\Event;
use App\Session;
use App\Sessionspeaker;
use App\User;
use App\Attendee;

class SpeakerController extends Controller 
{

    public function store(Request $request){
        if ($request->has('email') && $request->has('eventId')){
            $event = Event::findOrFail($request->eventId);
            if ($event->owner_id === $request->user()->id) {
                $user = User::where('email', $request->email)->first();
                
                if (!$user) {
                    // This email address is not yet registered, so we create the user and send them an email with their temporary password
                    $password = uniqid();
                    $user = User::create([
                        'first_name' => 'Anonymous',
                        'last_name' => 'User',
                        'email' => $request->email,
                        'password' => Hash::make($password),
                    ]);

                    Mail::to($request->email)->send(new \App\Mail\AccountCreated($password, $request->email));
                } else {
                    // If this user is already a speaker at this event, don't add them again
                    $s = Speaker::where('user_id', $user->id)->first();
                    if ($s) {
                        return JsonResponse::create(['error' => 'This user is already a speaker at this event.']);
                    }
                }

                // when adding a speaker, check if they're already an attendee at the event, if not, add them.
                $isAttending = Attendee::where('user_id', $user->id)->first();
                if (!$isAttending) {
                    Attendee::create([
                        'user_id' => $user->id,
                        'event_id' => $event->id,
                        'is_speaker' => 1,
                    ]);
                } else {
                    $isAttending->is_speaker = 1;
                    $isAttending->save();
                }

                $speaker = new Speaker;
                $speaker->event_id = $request->eventId;
                $speaker->user_id = $user->id;
                $speaker->save();

                return JsonResponse::create(['speaker' => $speaker, 'userDetails' => $user]);
            }
        }

        abort(401);
    }

    public function show($id, Request $request){
        $speaker = Speaker::findOrFail($id);
        $user = User::where('id', $speaker->user_id)->first();
        $user->imageUrl = $user->getFirstMediaUrl();

        return $user;
    }

    public function destroy($id, Request $request){
        $speaker = Speaker::findOrFail($id);
        $event = Event::findOrFail($speaker->event_id);

        if ($event->owner_id === $request->user()->id) {
            Sessionspeaker::where('speaker_id', $id)->delete();
            $speaker->delete();
            return JsonResponse::create(['error' => false]);
        } else {
            abort(401);
        }
    }

    public function getEventSpeakers($id, Request $request){
        $speakers = Speaker::where('event_id', $id)->get();
        foreach ($speakers as $speaker) {
            $user = User::find($speaker->user_id);
            if ($user) {
                // User images
                $speaker->imageUrl = $user->getFirstMediaUrl();
    
                // User info
                $speaker->speakerName = $user->first_name . ' ' . $user->last_name;
                $speaker->email = $user->email;
            }
        }
        return $speakers;
    }
  
}

?>