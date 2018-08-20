<?php 

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\User;

class UserController extends Controller 
{

    public function getUserProfile($id, Request $request) {
        $user = User::where('id', $id)->first();
        return $user;
    }

    public function update(Request $request){
        
    }
  
}

?>