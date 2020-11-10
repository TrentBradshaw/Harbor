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
            $user = User::where('id', Auth::user()->id)->get()->toArray();
            //switch this to many to many later
            $followed_count = count (Follower::where('follower_id', Auth::user()->id)->get()->toArray());
            $follower_count = count (Follower::where('followee_id', Auth::user()->id)->get()->toArray());

            $pageOwnerInfo  =  array(
                //"user" = User::where('id', Auth::user()->id)->get()->toArray();
                "username" => $user[0]['username'],
                "pfp_url" => $user[0]['pfp_url'],
                "description" =>   $user[0]['description'],
                "followers_count" => $follower_count, //$user[0]['followers_count'],
                "followed_count" => $followed_count, // $user[0]['followed_count'],
                "statements_count" =>  $user[0]['statements_count'],
                "docks_count" => $user[0]['docks_count'],
            );

            $statements_array =[];
            array_push($statements_array, Statement::where('user_id', Auth::user()->id)->get()->toArray());
           // print_r(($statements_array[0]));
            $feedInfo = [];
            
            
            foreach ($statements_array as $key => $value) {
                array_push($feedInfo, $value);
            }
            //print_r($feedInfo);
                //USE TWITTER'S METHOD OF STORING FOLLOWERS
                // make all of this the statements object
                //LOOK UP ALL ACCOUNTS FOLLOWING USER ACCOUNT
                //GO GRAB ALL OF THE STATEMENTS FROM THE ACCOUNTS
                //SORT THEM IN CHRONOLOGICAL ORDER
                //MAKE A STATEMENT COMPONENT FOR EACH ONE
                //APPEND THEM TO THE STATEMENT
            //return view('home')->with('pageOwnerInfo', json_encode($pageOwnerInfo))->with('feedInfo', json_encode($feedInfo)); //json_encode($data)
            return view('home',
            [
                'pageOwnerInfo'=> json_encode($pageOwnerInfo),
                'feedInfo', json_encode($feedInfo),
                'currentUser'=> $user[0]['username'],
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
