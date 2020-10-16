<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Statement;
use App\Models\User;
use App\Models\Following;
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
            //$user = Auth::id(); 
            //$user = User::where('id', Auth::id());
            $user = User::where('id', Auth::user()->id)->get()->toArray();
            $username = $user[0]['username'];
            $pfp_url = $user[0]['pfp_url'];
            $description =  $user[0]['description'];
            $followers_count = $user[0]['followers_count'];
            $followed_count =  $user[0]['followed_count'];
            $statements_count =  $user[0]['statements_count'];
            $topics_count =  $user[0]['topics_count'];


            

            //OPTIMIZE THESE ALGORITHMS
            
            //$user_id = $user->
            if($followed_count = 0){

            }
            //following = all of the followers of user
            $following = Following::where('user_id', Auth::user()->id)->get()->toArray();
            $statements_id_array = [];
            //for each follower push their id into an array
            foreach ($following as $value)
            {
                array_push($statements_id_array, $value['follower_id']);
                print_r($value['follower_id']);
            }
            $statements_array =[];
           // $statement;
            foreach ($statements_id_array as $value2)
            {
                print_r($value2);
                
                //print_r($statement[0]);
                array_push($statements_array, Statement::where('user_id', $value2)->get()->toArray());
                
            }  
            
            
            //$statement = Statement::orderBy('body', 'desc')->take(1)->get()->toArray();
           //print_r($statements_array);
            //print_r($statement);
            //return view('home')->with('data', json_encode($data))->with('statement', json_encode($statement));
            $data = array();
            $data['userInfo']  =  array(
                    //make all of this the profile info object
                    //"user" = User::where('id', Auth::user()->id)->get()->toArray();
                    "username" => $username,
                    "pfp_url" => $pfp_url,
                    "description" =>  $description,
                    "followers_count" => $followers_count,
                    "followed_count" => $followed_count,
                    "statements_count" => $statements_count,
                    "topics_count" => $topics_count,
            );
            $data['feedInfo'] = array(
                //PUMP THE DATA INTO HERE WITH A FOR LOOP!
            );
            
            foreach ($statements_array as $key => $value) {
                array_push($data['feedInfo'], $value);
            }
            
                
                
                
                //USE TWITTER'S METHOD OF STORING FOLLOWERS
                // make all of this the statements object

            

                //LOOK UP ALL ACCOUNTS FOLLOWING USER ACCOUNT
                //GO GRAB ALL OF THE STATEMENTS FROM THE ACCOUNTS
                //SORT THEM IN CHRONOLOGICAL ORDER
                //MAKE A STATEMENT COMPONENT FOR EACH ONE
                //APPEND THEM TO THE STATEMENT
            return view('home')->with('data', json_encode($data)); //json_encode($data)
        }
        else{
            return view('welcome');
        }
    }
}
