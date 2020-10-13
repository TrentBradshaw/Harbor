<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Statement;
use App\Models\User;
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
        if (Auth::check()) {
            // $user = Auth::id(); 
            //$user = User::where('id', Auth::id());
            $user = User::where('id', Auth::user()->id)->get()->toArray();
            $username = $user[0]['username'];
            $pfp_url = $user[0]['pfp_url'];
            $description =  $user[0]['description'];
            $followers_count = $user[0]['followers_count'];
            $followed_count =  $user[0]['followed_count'];
            $statements_count =  $user[0]['statements_count'];
            $topics_count =  $user[0]['topics_count'];

            $data = [
                //"user" = User::where('id', Auth::user()->id)->get()->toArray();
                "username" => $username,
                "pfp_url" => $pfp_url,
                "description" =>  $description,
                "followers_count" => $followers_count,
                "followed_count" => $followed_count,
                "statements_count" => $statements_count,
                "topics_count" => $topics_count,
        
            ];
            print_r($user[0]);
            //$user_id = $user->
            
            //$statement = ['pickle', 'rick'];//Statement::orderBy('body', 'desc')->take(1)->get();
            //return view('home')->with('data', json_encode($data))->with('statement', json_encode($statement));
            return view('home')->with('data', json_encode($data)); //json_encode($data)
        }
        else{
            return view('welcome');
        }
    }
}
