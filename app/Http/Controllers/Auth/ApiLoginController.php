<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravel\Passport\Client;
use Illuminate\Support\Facades\Validator;

class ApiLoginController extends Controller
{
    private $client;

    /**
     * DefaultController constructor.
     */
    public function __construct()
    {
        $this->client =     $client = Client::where('password_client', 1)->first();
    }

    /**
     * @param Request $request
     * @return mixed
     */
    protected function authenticate(Request $request)
    {
        $validate = [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6'];

        $valid = Validator::make($request->only(['email', 'last_name', 'first_name', 'password']),$validate);

        if ($valid->fails()) {
            return  response()->json($valid->errors()->all(), 400);
        }

        $request->request->add([
            'grant_type' => 'password',
            'username' => $request->email,
            'password' => $request->password,
            'client_id' => $this->client->id,
            'client_secret' => $this->client->secret,
            'scope' => ''
        ]);

        $proxy = Request::create(
            'oauth/token',
            'POST'
        );

        return \Route::dispatch($proxy);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    protected function refreshToken(Request $request)
    {
        $request->request->add([
            'grant_type' => 'refresh_token',
            'refresh_token' => $request->refresh_token,
            'client_id' => $this->client->id,
            'client_secret' => $this->client->secret,
            'scope' => ''
        ]);

        $proxy = Request::create(
            'oauth/token',
            'POST'
        );

        return \Route::dispatch($proxy);
    }
}
