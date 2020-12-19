<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResourceCollection;
use App\Models\Status;
use App\Models\Follower ;
use Illuminate\Support\Facades\Auth;

class ShowUserController extends Controller
{
    //

    //rework models so you have simplified functions in there that you can call from here


    // FIX ALL OF THIS WORDING SO FOLLOWED IS JUST FOLLOWING 
    public function ShowUser($username){
        if (Auth::check()) {
            if(User::where('username', $username)->get()->toArray()){
                $pageOwner = User::where('username', $username)->get()->toArray();
                $currentUser = User::where('id', Auth::user()->id)->get()->toArray();

                $isFollowing = Follower::where('follower_id', $currentUser[0]['id'])->where('followee_id', $pageOwner[0]['id']);
            
                $userId = $pageOwner[0]['id'];
                
    
                
                $statements_array =[];
    
    
                array_push($statements_array, Status::where('username', $username)->get()->toArray());
                //print_r($statements_array);
                /*
                $pageOwnerInfo  =  array(
                        //make all of this the profile info object
                        //"user" = User::where('id', Auth::user()->id)->get()->toArray();
                         'userId' = $userId
                );
                */
                $feedInfo = array(
                    //PUMP THE DATA INTO HERE WITH A FOR LOOP!
                );
                
                foreach ($statements_array as $key => $value) {
                    array_push($feedInfo, $value);
                }  
                function CheckIfFollowing(array $currentUser, array $pageOwner){
                    $isFollowing = (Follower::where('follower_id', $currentUser[0]['id'])->where('followee_id', $pageOwner[0]['id'])->exists());
                    error_log($isFollowing);
                    return $isFollowing;
                    if($isFollowing === null){
                        return 'false';
                    }else if ($isFollowing != null){
                        return 'true';
                    }
                   // return ($isFollowing != null);
                    
                }
                
                //print_r($currentUser[0]['username']);
                $currentUserUsername = $currentUser[0]['username'];
               // print_r($currentUserUsername);
                return view('showUser',[
                    'pageOwnerInfo'=> json_encode($pageOwnerInfo),
                    //IF FOLLOWING ADD THIS AS DATA TO CHANGE THE FOLLOW BUTTON
                    'isFollowing' => strval(CheckIfFollowing($currentUser, $pageOwner)),
                    'userExists' => 'true',
                    'currentUser'=> $currentUserUsername,
                    'feedInfo'=> json_encode($feedInfo[0]),
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
                    'userExists' => false,
                    'currentUser'=> $currentUserUsername,
                    
                ]);
            }     
        }
        
    }
    public function Show($username): UserResource{
        return new UserResource(User::where('username', $username)->get()->toArray());
    }
    public function Index(): UserResourceCollection{
        return new UserResourceCollection(User::paginate());
    }
    public function Store(){
        $request->validate([

        ]);
        return new PersonResource($person);
    }
}