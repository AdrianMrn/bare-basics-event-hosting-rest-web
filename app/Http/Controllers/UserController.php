<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        $validate = [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'linkedin' => 'nullable|URL|max:255',
            'facebook' => 'nullable|URL|max:255',
            'twitter' => 'nullable|URL|max:255',
            'website' => 'nullable|URL|max:255',
            'image' => 'nullable|dimensions:max_width=1240,max_height=1240|max:10240'
        ];

        $valid = Validator::make($request->only(['first_name', 'last_name', 'description', 'company', 'position', 'linkedin', 'facebook', 'twitter', 'website']),$validate);
        
        if ($valid->fails()) {
            return response()->json($valid->errors()->all(), 400);
        }

        $user = User::where('id', $request->user()->id)->first();
        $updatedUser = $user->update($request->all());
        
        if ($request->image) {
            $user->clearMediaCollection();
            $user->addMediaFromRequest('image')->toMediaCollection();
        }
        
        $user = User::where('id', $request->user()->id)->first();
        
        return JsonResponse::create(['error' => false, 'user' => $user]);
    }

    public function updateImage(Request $request){
        $validate = ['image' => 'required|dimensions:max_width=500,max_height=500|max:10240'];

        $valid = Validator::make($request->only(['image']),$validate);
        
        if ($valid->fails()) {
            return response()->json($valid->errors()->all(), 400);
        }

        $user = User::where('id', $request->user()->id)->first();

        $user->clearMediaCollection();
        $user->addMediaFromRequest('image')->toMediaCollection();

        return JsonResponse::create(['error' => false]);
    }
  
}

?>