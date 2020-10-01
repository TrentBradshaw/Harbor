<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Statement;

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
    public function home(){
        $data2 = [
            'john', 'doe'
          ];
          
        //$data = Statement::orderBy('body', 'desc')->take(1)->get();
        return view('home')->with('data', json_encode($data2));
    }
}
