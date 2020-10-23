<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Statement;
use App\Models\Following;
use Illuminate\Support\Facades\Auth;

class ShowUserController extends Controller
{
    public function ShowUser($username){
        if (Auth::check()) {
            if(User::where('username', $username)->get()->toArray()){
            print_r(User::where('username', $username)->get()->toArray());
                $pageOwner = User::where('username', $username)->get()->toArray();
                print_r($pageOwner);
                $username = $pageOwner[0]['username'];
                $pfp_url = $pageOwner[0]['pfp_url'];
                $description =  $pageOwner[0]['description'];
                $followers_count = $pageOwner[0]['followers_count'];
                $followed_count =  $pageOwner[0]['followed_count'];
                $statements_count =  $pageOwner[0]['statements_count'];
                $docks_count =  $pageOwner[0]['docks_count'];
                
    
                
                $statements_array =[];
    
    
                array_push($statements_array, Statement::where('username', $username)->get()->toArray());
            
                $pageOwnerInfo  =  array(
                        //make all of this the profile info object
                        //"user" = User::where('id', Auth::user()->id)->get()->toArray();
                        "username" => $username,
                        "pfp_url" => $pfp_url,
                        "description" =>  $description,
                        "followers_count" => $followers_count,
                        "followed_count" => $followed_count,
                        "statements_count" => $statements_count,
                        "docks_count" => $docks_count,
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
                return view('showUser',[
                    'pageOwnerInfo'=> json_encode($pageOwnerInfo),
                    'user'=> $currentUserUsername,
                ]);
            }
            else{
                $currentUser = User::where('id', Auth::user()->id)->get()->toArray();
                    //print_r($currentUser[0]['username']);
                    $currentUserUsername = $currentUser[0]['username'];
                $data = array();
                    $pageOwnerInfo  =  array(
                            //make all of this the profile info object
                            //"user" = User::where('id', Auth::user()->id)->get()->toArray();
                            "username" => $username,
                            "pfp_url" => 'ded', // later add blacked out pfp
                            "description" =>  'This user does not exist, please try again',
                            "followers_count" => 0,
                            "followed_count" => 0,
                            "statements_count" => 0,
                            "docks_count" => 0,
                    );
                return view('showUser',
                [
                    'pageOwnerInfo'=> json_encode($pageOwnerInfo),
                    'currentUser'=> $currentUserUsername,
                ]);
            }     
        }
        
    }
}