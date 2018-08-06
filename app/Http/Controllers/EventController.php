<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Event;

class EventController extends Controller 
{

    public function create(Request $request){

    }

    public function get(Request $request){

    }

    public function update(Request $request){
        return JsonResponse::create(['test' => 'hello world', 200]);
    }

    public function delete(Request $request){

    }

    public function getUserEvents(Request $request){
        $events = Event::where('owner_id', $request->user()->id)->get();
        return $events;
    }
  
}

?>