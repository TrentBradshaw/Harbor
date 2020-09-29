<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use Illuminate\Database\Connection;
use App\Http\Controllers\StatementsController;
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

    // Test database connection
    try {
        DB::connection()->getPdo();
        echo "Connected successfully to: " . DB::connection()->getDatabaseName();
        $results = DB::table('users')->get();
        echo $results;
            
        
    } catch (\Exception $e) {
        die("Could not connect to the database. Please check your configuration. error:" . $e );
    }

    return view('welcome');
    
});
/*
Route::get('/{user_id}/{statement_id}', function($statement_id){
    return view('statements.show')->with('statement_id', $statement_id);
});
*/
Route::get('/{username}/{id}', [App\Http\Controllers\StatementsController::class, 'show'])->name('show');

//Route::get('user/{id}/customEdit', 'UserController@customEdit');

/*
Route::get('/{user_id}/{statement_id}', function($statement_id){
    StatementsController->show($statement_id);
});
*/
Route::resource('statements', StatementsController::class);

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'home'])->name('home');
//Route::get('/', [HomeController::class, 'index'])->name('home');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
