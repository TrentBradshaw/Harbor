<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DockEngagement;
use App\Models\Follower;
use App\Models\Profile;
use App\Models\User;
use App\Models\Dock;
use Illuminate\Support\Facades\Auth;

class EngagementController extends Controller
{   public function DockSubscriptions(){
    /*
        $docksArray = Dock::where('id', DockEngagement::where('subscriber_id', Auth::user()->id)['dock_id'])->get()->toArray();
        return response()->json([
            'feed'=> $dockEngagement,
        ]);
        */
        $docksProfilesArray = array();
        $docksIdArray =DockEngagement::where('subscriber_id', Auth::user()->id)->get()->toArray();
        for ($i=0; $i < count($docksIdArray); $i++) { 
            $profile =  Dock::where('id',$docksIdArray[$i]['dock_id'])->get()->first();
            $profile['url'] = "http://localhost/dock/" . $profile->title;
           
            array_push($docksProfilesArray,$profile);
        }
        if (count($docksProfilesArray) > 0){
            return response()->json([
                'feed'=> $docksProfilesArray
            ]);
        }else{
            return response()->json([
                'feed'=> []
            ]);
        }
        //id	created_at	updated_at	subscriber_id	subscribed	dock_id
    }
    public function Followers(){
        $followersProfilesArray = array();
        if(Follower::where('followee_id', Auth::user()->id)->exists()){
            $followersIdArray = Follower::where('followee_id', Auth::user()->id)->get()->toArray();
            for ($i=0; $i < count($followersIdArray); $i++) { 
                $profile = Profile::where('user_id',$followersIdArray[$i]['follower_id'])->get()->first();
                $profile['username'] = User::where('id', $profile->user_id)->first()['username'];
                $profile['url'] = "http://localhost/user/" . $profile->username;
           
                array_push($followersProfilesArray,$profile);
            }
        }
        
        if (count($followersProfilesArray) > 0){
            return response()->json([
                'feed'=> $followersProfilesArray
            ]);
        }else{
            return response()->json([
                'feed'=> []
            ]);
        }
        return response()->json([
            'feed'=> $arrayName
        ]);
        $followersArray = Profile::where('user_id', )->get()->toArray();
        return response()->json([
            'feed'=> $followersArray
        ]);
    }
    public function Following(){
        
        $followingProfilesArray = array();
        $followingIdArray = Follower::where('follower_id', Auth::user()->id)->get()->toArray();
        for ($i=0; $i < count($followingIdArray); $i++) { 
            $profile = Profile::where('user_id',$followingIdArray[$i]['followee_id'])->get()->first();
            $profile['username'] = User::where('id', $profile->user_id)->first()['username'];
            $profile['url'] = "http://localhost/user/" . $profile->username;
           array_push($followingProfilesArray, $profile);
        }
        if (count($followingProfilesArray) > 0){
            return response()->json([
                'feed'=> $followingProfilesArray
            ]);
        }else{
            return response()->json([
                'feed'=> []
            ]);
        }
       
        /*
        $followingArray = Profile::where('user_id', Follower::where('follower_id', Auth::user()->id)['followee_id'])->get()->toArray();
        return response()->json([
            'feed'=> $followingArray,
        ]);
        */
    }
    public function GetNotifications(){
        $followers = Follower::where('follower_id', Auth::user()->id)->get()->toArray();
        $userposts = Post::where('creator_id', Auth::user()->id)->get()->toArray();
        $userComments = PostComments::where('creator_id', Auth::user()->id)->get()->toArray();
        $userStatuses = Status::where('user_id', Auth::user()->id)->get()->toArray();
        
        $notificationArray = array();
        foreach ($userposts as $key => $value) {
            
            $likes = PostEngagement::where('post_id', $userposts['key']['id'])->get()->toArray();


            // find the likes
            // find the comments
            // make an object
            // append it to the 
            // $userposts[$key][]
            $posts = Post::where('creator_id',Auth::user()->id)->get()->toArray();

        }  

        return response()->json([
            'deleted'=> 'wee',
            'json'=>$json
        ]);

        

        foreach ($followers as $key => $value) {
            $posts = Post::where('creator_id',Auth::user()->id)->get()->toArray();
        }  
        $postComments = PostComments::where();
        $statuses = Status::where();
        $followers = Follower::where() ;
        $statusUpvotes = StatusEngagement::where();
        $postUpvotes = PostEngagement::where();
        // next package stuff up and detail the notification.
        //examples  x person liked/comented y target z amount of time ago

        return response()->json([
            'deleted'=> 'wee',
            'json'=>$json
        ]);
    }
    
    public function AddDockSubscription(){
        $json = json_decode(file_get_contents('php://input'), true); //grab request
        $dockEngagement = new DockEngagement();
        $dockEngagement->subscriber_id = Auth::user()->id;
        $dockEngagement->subscribed = true;
        $dockEngagement->dock_id = Dock::where('title', $json['target'])->get()->first()['id'];

        $dockEngagement->save();
    }
    public function DeleteDockSubscription(){
        $json = json_decode(file_get_contents('php://input'), true); //grab request
        $subscribed = DockEngagement::where('subscriber_id', Auth::user()->id)
        ->where('dock_id', 
        Dock::where('title', $json['target'])->get()->first()['id'])->first();
        if ($subscribed == null){
            return response()->json([
                'deleted'=> 'wee',
                'json'=>$json
            ]);
        }
        $subscribed->delete();
        if ($subscribed == null){
            return response()->json([
                'deleted'->true
            ]);
        }
    }
    public function DockSubscriptionStatus(){
       
        $query = request('query');
        $subscribed = DockEngagement::where('subscriber_id', Auth::user()->id)->where('dock_id', Dock::where('title', $query)->get()->first()['id'])->first();
       
        if ($subscribed === null){
            return response()->json([
                'subscribed' => false,
            ]);
        }
        else{
            return response()->json([
                'subscribed' => true
            ]);
        }
        }
}
