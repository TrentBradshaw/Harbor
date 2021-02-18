<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Status;
use App\Models\User;
use App\Models\Follower;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //Reinstate this when you have a better method of checking auth at home page.
        //Use a remember me function and if they have some session or cookies then run auth
    }

    public function home(){
        if (Auth::check()) {
            $user = User::where('id', Auth::user()->id)->get();
            return view('home',
            [   'pageOwnerUsername' => $user[0]['username'],
                'userId' => Auth::id()
            ]);
        }
        else{
            return view('welcome');
        }
    }
    public function index()
    {
        return view('welcome');
    }
}
