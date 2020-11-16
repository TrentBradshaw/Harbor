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
Route::post('/userdetails', 'App\Http\Controllers\GetCurrentUserController');
Route::get('/status', [App\Http\Controllers\StatusController::class, "ShowStatus"])->name('ShowStatus');
Route::get('/submit/dock', [App\Http\Controllers\DockController::class, 'SubmitForm'])->name('SubmitForm');
Route::get('/submit/post', [App\Http\Controllers\SubmitController::class, 'Submit'])->name('Submit');


//Route::get('/GetDockPosts', [App\Http\Controllers\DockController::class, 'GetDockPosts'])->name('GetDockPosts');

Route::get('/dock/{dock}', [App\Http\Controllers\ShowDockController::class, 'ShowDock'])->name('ShowDock');
Route::get('/dock/{dock}/submit', [App\Http\Controllers\PostController::class, 'PostForm'])->name('PostForm');
Route::get('/home', [App\Http\Controllers\HomeController::class, 'home'])->name('home');
Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');
Auth::routes();
Route::get('/{username}', [App\Http\Controllers\ShowUserController::class, 'ShowUser'])->name('showUser');
Route::get('/{username}/{id}', [App\Http\Controllers\StatusController::class, 'show'])->name('show');


Route::post('/api/dock/submit', [App\Http\Controllers\DockController::class, 'Store']);
Route::get('/api/dock/{dock}', [App\Http\Controllers\DockController::class, 'GetDockPosts'])->name('GetDockPosts');
Route::post('/api/post/submit', [App\Http\Controllers\PostController::class, 'Store']);
Route::post('/api/post/{post}', [App\Http\Controllers\PostController::class, 'ShowPost']);

//Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
