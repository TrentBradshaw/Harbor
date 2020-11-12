<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FeedController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('register', 'App\Http\Controllers\AuthController@register');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::get('user-profile', 'App\Http\Controllers\AuthController@userProfile');
});
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:api')->get('/submit', function (Request $request) {
    return $request->user();
});
Route::post('users', 'UserController@register');
Route::post('/api/login', 'App\Http\Controllers\Auth\APIUserAuthController@login');
Route::post('/register',  'App\Http\Controllers\Auth\APIUserAuthController@register');
Route::post('/api/logout', 'App\Http\Controllers\Auth\APIUserAuthController@logout');
Route::group(['middleware' => 'auth:api'], function(){
    Route::post('details', 'App\Http\Controllers\API\UserController@details');
});
Route::get('api/user/me', 'App\Http\Controllers\GetCurrentUserController');
Route::apiResource('/dock', 'App\Http\Controllers\DockController');
Route::apiResource('/status', 'App\Http\Controllers\StatusController');
Route::apiResource('/followers','App\Http\Controllers\FollowerController');
//Route::get('/feed/{username}', 'App\Http\Controllers\FeedController');

