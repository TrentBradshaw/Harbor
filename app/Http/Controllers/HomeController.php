<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * 
     */
    public function index()
    {
        return view('welcome');
    }
}
