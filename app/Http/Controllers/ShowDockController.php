<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Statement;
use App\Models\User;
use App\Models\Following;
use Illuminate\Support\Facades\Auth;

class ShowDockController extends Controller
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
    public function ShowDock(){
        if (Auth::check()) {
             
           // $pageOwner = User::where('username', $username)->get()->toArray();
           // print_r($pageOwner);
            //$username = $pageOwner[0]['username'];
            //$pfp_url = $pageOwner[0]['pfp_url'];
          //  $description =  $pageOwner[0]['description'];
          //  $followers_count = $pageOwner[0]['followers_count'];
            //$followed_count =  $pageOwner[0]['followed_count'];
          ////  $statements_count =  $pageOwner[0]['statements_count'];
            //$topics_count =  $pageOwner[0]['topics_count'];

            //$UserToGrabStatementsFor = User::where('username', $username)->get()->toArray();
            //$statements_id_array = [];
            //for each follower push their id into an array
            //foreach ($following as $value)
           // {
               // array_push($statements_id_array, $value['follower_id']);
               
          //  }
            $statements_array =[];
           // $statement;
           // print_r($UserToGrabStatementsFor);
            //MAKE THIS USER ID


            // array_push($statements_array, Dock::where('name', $dockName)->get()->toArray());
            

            $data = array();
            $data['userInfo']  =  array(
                    //make all of this the profile info object
                    //"user" = User::where('id', Auth::user()->id)->get()->toArray();
                    //"username" => $username,
                   // "pfp_url" => $pfp_url,
                   // "description" =>  $description,
                  //  "followers_count" => $followers_count,
                  //  "followed_count" => $followed_count,
                  //  "statements_count" => $statements_count,
                   // "topics_count" => $topics_count,
            );
            $data['feedInfo'] = array(
                //PUMP THE DATA INTO HERE WITH A FOR LOOP!
            );
            
            foreach ($statements_array as $key => $value) {
                array_push($data['feedInfo'], $value);
            }  
            
            $currentUser = User::where('id', Auth::user()->id)->get()->toArray();
            //print_r($currentUser[0]['username']);
            $currentUserUsername = $currentUser[0]['username'];
           // print_r($currentUserUsername);
                return view('ShowDock',[
                    'data'=> json_encode($data),
                    'user'=> $currentUserUsername,
                ]);
        }
        else{
            return view('welcome');
        }
    }
}
