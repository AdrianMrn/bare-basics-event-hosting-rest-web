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
  
}

?>