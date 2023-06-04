<?php

use App\Http\Requests\Auth\LoginRequest;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post("/createSub", function (Request $request) {
    return Subscription::create([
        "email" => request("email"),
    ]);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::post("/logout",  function (Request $request) {
        /** @var User $user */
        $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    });


    Route::get("/getall", function (Request $request) {
        return Subscription::all();
    });
    Route::delete("/delete/{id}", function ($id) {

        Subscription::destroy($id);
        return response()->json($id);
    });
});


Route::post("/log",  function (LoginRequest $request) {
    $credentials = $request->validated();
    $remember = $credentials['remember'] ?? false;
    unset($credentials['remember']);

    if (!Auth::attempt($credentials, $remember)) {
        return response([
            'error' => 'The Provided credentials are not correct'
        ], 422);
    }
    $user = Auth::user();
    $token = $user->createToken('main')->plainTextToken;

    return response([
        'user' => $user,
        'token' => $token
    ]);
});
