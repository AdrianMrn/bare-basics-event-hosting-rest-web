<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\User;

class UserController extends Controller 
{

    public function getUserProfile($id, Request $request) {
        $user = User::where('id', $id)->first();
        $user->imageUrl = $user->getFirstMediaUrl();
        return $user;
    }

    public function getMyProfile(Request $request) {
        $user = User::where('id', $request->user()->id)->first();
        $user->imageUrl = $user->getFirstMediaUrl();
        return $user;
    }
    
    public function update(Request $request){
        // TODO: complete this function, with image linking & profile update
        $user = User::where('id', $request->user()->id)->first();
        $updatedUser = $user->update($request->all());

        if ($request->image) {
            $user->clearMediaCollection();
            $user->addMediaFromRequest('image')->toMediaCollection();
        }

        return JsonResponse::create(['error' => false]);
    }
  
}

?>