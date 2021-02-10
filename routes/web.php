<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use Illuminate\Database\Connection;
use App\Http\Controllers\StatementsController;
use App\Http\Controllers\ShowUserController;
use App\Http\Controllers\ShowDockController;
use App\Http\Controllers\SubmitController;
use App\Http\Controllers\DockController;

//Route::view('/{path?}', 'app');
Route::post('/api/followers', [App\Http\Controllers\FollowerController::class, 'Store']);
Route::delete('/api/followers', [App\Http\Controllers\FollowerController::class, 'Destroy']);
Route::get('/api/followers', [App\Http\Controllers\FollowerController::class, 'Grab']);
Route::get('/api/dockSubscriptionStatus', [App\Http\Controllers\EngagementController::class, 'DockSubscriptionStatus']);
Route::post('/api/dockSubscription', [App\Http\Controllers\EngagementController::class, 'AddDockSubscription']);
Route::delete('/api/dockSubscription', [App\Http\Controllers\EngagementController::class, 'DeleteDockSubscription']);
Route::get('/api/getDockSubscriptions', [App\Http\Controllers\EngagementController::class, 'DockSubscriptions']);
Route::get('/api/getFollowers', [App\Http\Controllers\EngagementController::class, 'Followers']);
Route::get('/api/getFollowing', [App\Http\Controllers\EngagementController::class, 'Following']);
route::get('/api/profile', 'App\Http\Controllers\ProfileController');
Route::get('api/feed/home', [App\Http\Controllers\FeedController::class, 'GetHomeFeed'])->name('GetHomeFeed');
Route::get('api/feed', [App\Http\Controllers\FeedController::class, 'GetUserFeed'])->name('GetUserFeed');
Route::get('api/post', [App\Http\Controllers\PostController::class, 'GetPost'])->name('GetPost');
Route::delete('api/post', [App\Http\Controllers\PostController::class, 'DeletePost'])->name('DeletePost');
Route::put('api/engagement', [App\Http\Controllers\ReeController::class, 'VoteOnContent']);
Route::get('api/engagement', [App\Http\Controllers\ReeController::class, 'GetCurrentVoteStatus']);
Route::get('api/notifications', [App\Http\Controllers\EngagementController::class, 'GetNotifications']);
Route::post('api/comments/submit', [App\Http\Controllers\PostCommentsController::class, 'Store']);
Route::put('api/comments/delete', [App\Http\Controllers\PostCommentsController::class, 'Delete']);
Route::get('api/comments', [App\Http\Controllers\PostCommentsController::class, 'GetPostComments']);
Route::post('/api/docks/submit', [App\Http\Controllers\DockController::class, 'Store']);
Route::get('api/docks', [App\Http\Controllers\DockController::class, 'GetDocks'])->name('GetDocks');
Route::get('/api/dock/{dock}', [App\Http\Controllers\DockController::class, 'GetDockPosts'])->name('GetDockPosts');
Route::post('/api/posts/submit', [App\Http\Controllers\PostController::class, 'Store']);
Route::get('/api/post/{post}', [App\Http\Controllers\PostController::class, 'ShowPost']);
Route::post('/api/statuses/submit', [App\Http\Controllers\StatusController::class, 'Store']);
Route::get('/api/statuses', [App\Http\Controllers\StatusController::class, 'GetStatus']);
Route::delete('/api/statuses/delete', [App\Http\Controllers\StatusController::class, 'DeleteStatus']);
Route::get('/api/userdetails', 'App\Http\Controllers\GetCurrentUserController'); // switch this to userController::class getcurrentuser

Route::view('/{path?}', 'app')
     ->where('path', '.*')
     ->name('react');



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
