<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use Illuminate\Database\Connection;
use App\Http\Controllers\StatementsController;
use App\Http\Controllers\ShowUserController;
use App\Http\Controllers\ShowDockController;
use App\Http\Controllers\SubmitController;
use App\Http\Controllers\DockController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', [HomeController::class, 'index']);


//DON'T FORGET TO ADD TAGS TO GO WITH YOUR STATEMENTS. HASHTAGS AND REGULAR TAGS.


Route::get('/', function () {

    if (Auth::check()) {
        // Test database connection
        return redirect('/home');
    } else{
        try {
            DB::connection()->getPdo();
            echo "Connected successfully to: " . DB::connection()->getDatabaseName();
            $results = DB::table('users')->get();
            echo $results;
        } catch (\Exception $e) {
            die("Could not connect to the database. Please check your configuration. error:" . $e );
        }

        return view('welcome');
    }
});
/*
Route::get('/{user_id}/{statement_id}', function($statement_id){
    return view('statements.show')->with('statement_id', $statement_id);
});
*/


//Route::get('user/{id}/customEdit', 'UserController@customEdit');

/*
Route::get('/{user_id}/{statement_id}', function($statement_id){
    StatementsController->show($statement_id);
});
*/

//FIX THIS ABOSLUTE MESS OF UNORGANIZED ROUTING 

Route::get('/upload', [App\Http\Controllers\FileUploadController::class, 'showUploadForm'])->name('showUploadForm');
        

Route::post('/upload', [App\Http\Controllers\FileUploadController::class, 'storeUploads'])->name('storeUploads');



Route::get('/api/userdetails', 'App\Http\Controllers\GetCurrentUserController'); // switch this to userController::class getcurrentuser
Route::get('/status', [App\Http\Controllers\StatusController::class, "ShowStatus"])->name('ShowStatus');
Route::get('/submit/dock', [App\Http\Controllers\DockController::class, 'SubmitForm'])->name('SubmitForm');
Route::get('/submit/post', [App\Http\Controllers\SubmitController::class, 'Submit'])->name('Submit');


//Route::get('/GetDockPosts', [App\Http\Controllers\DockController::class, 'GetDockPosts'])->name('GetDockPosts');

Route::get('/dock/{dock}', [App\Http\Controllers\ShowDockController::class, 'ShowDock'])->name('ShowDock');
Route::get('/post/submit', [App\Http\Controllers\PostController::class, 'PostForm'])->name('PostForm');
Route::get('/dock/{dockName}/{id}/{PostTitle}', [App\Http\Controllers\PostController::class, "ShowPost"])->name("ShowPost");
Route::get('/home', [App\Http\Controllers\HomeController::class, 'home'])->name('home');
Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');
Auth::routes();
Route::get('/user/{username}', [App\Http\Controllers\ShowUserController::class, 'ShowUser'])->name('showUser');
//Route::get('/{username}/{id}', [App\Http\Controllers\StatusController::class, 'show'])->name('show');
Route::post('/api/followers', [App\Http\Controllers\FollowerController::class, 'Store']);
Route::delete('/api/followers', [App\Http\Controllers\FollowerController::class, 'Destroy']);
Route::get('/api/followers', [App\Http\Controllers\FollowerController::class, 'Grab']);
route::get('/api/profile', 'App\Http\Controllers\ProfileController');
Route::get('api/feed/home', [App\Http\Controllers\FeedController::class, 'GetHomeFeed'])->name('GetHomeFeed');
Route::get('api/feed', [App\Http\Controllers\FeedController::class, 'GetUserFeed'])->name('GetUserFeed');
Route::get('api/post', [App\Http\Controllers\PostController::class, 'GetPost'])->name('GetPost');
Route::delete('api/post', [App\Http\Controllers\PostController::class, 'DeletePost'])->name('DeletePost');
Route::put('api/engagement', [App\Http\Controllers\ReeController::class, 'VoteOnContent']);
Route::get('api/engagement', [App\Http\Controllers\ReeController::class, 'GetCurrentVoteStatus']);
Route::post('api/comments/submit', [App\Http\Controllers\PostCommentsController::class, 'Store']);
Route::put('api/comments/delete', [App\Http\Controllers\PostCommentsController::class, 'Delete']);
Route::get('api/comments', [App\Http\Controllers\PostCommentsController::class, 'GetPostComments']);
Route::post('/api/docks/submit', [App\Http\Controllers\DockController::class, 'Store']);
Route::get('api/docks', [App\Http\Controllers\DockController::class, 'GetDocks'])->name('GetDocks');
Route::get('/api/dock/{dock}', [App\Http\Controllers\DockController::class, 'GetDockPosts'])->name('GetDockPosts');
Route::post('/api/posts/submit', [App\Http\Controllers\PostController::class, 'Store']);
Route::get('/api/post/{post}', [App\Http\Controllers\PostController::class, 'ShowPost']);
Route::post('/api/statuses/submit', [App\Http\Controllers\StatusController::class, 'Store']);
Route::delete('/api/statuses/delete', [App\Http\Controllers\StatusController::class, 'DeleteStatus']);
//Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
