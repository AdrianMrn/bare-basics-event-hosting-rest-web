<?php

namespace App\Http\Controllers\Auth;


use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Laravel\Passport\Client;


class ApiRegisterController extends Controller
{

    private $client;

    /**
     * DefaultController constructor.
     */
    public function __construct()
    {
        $this->client = Client::where('password_client', 1)->first();
    }

    public function register(Request $request)
    {
        $validate = [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6'];

        $valid = Validator::make($request->only(['email', 'last_name', 'first_name', 'password']),$validate);

        if ($valid->fails()) {
            return  response()->json($valid->errors()->all(), 400);
        }

        $data = request()->all();

        $saveData = $data;

        $saveData['password'] = bcrypt($saveData['password']);

        $user = User::create($saveData);

        $request->request->add([
            'grant_type'    => 'password',
            'client_id'     => $this->client->id,
            'client_secret' => $this->client->secret,
            'username'      => $data['email'],
            'password'      => $data['password'],
            'scope'         => null,
        ]);

        // Fire off the internal request.
        $token = Request::create(
            'oauth/token',
            'POST'
        );

        return \Route::dispatch($token);
    }
}
