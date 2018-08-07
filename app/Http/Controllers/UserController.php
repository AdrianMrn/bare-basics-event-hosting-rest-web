<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller 
{

    public function get(Request $request){
        if ($request->user()) {
            return JsonResponse::create([
                'error' => false,
                'userData' => $request->user()
                ]);
        } else {
            return JsonResponse::create(['error' => 'User not authenticated']);
        }
    }

    public function update(Request $request){
        
    }
  
}

?>