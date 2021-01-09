<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DockEngagement;
use App\Models\Follower;
use App\Models\Profile;
use App\Models\Dock;
use Illuminate\Support\Facades\Auth;

class EngagementController extends Controller
{   public function DockSubscriptions(){
        $docksArray = Dock::where('id', DockEngagement::where('subscriber_id', Auth::user()->id)['dock_id'])->get()->toArray();
        return response()->json([
            'feed'=> $dockEngagement,
        ]);
        //id	created_at	updated_at	subscriber_id	subscribed	dock_id
    }
    public function Followers(){
        $arrayName = array();
        $followersIdArray = Follower::where('followee_id', Auth::user()->id)->get()->toArray();
        for ($i=0; $i < count($followersIdArray); $i++) { 
            $arrayName.push($followersIdArray[$i]);
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
        $arrayName = array();
        $followingProfilesArray = array();
        $followingIdArray = Follower::where('follower_id', Auth::user()->id)->get()->toArray();
        for ($i=0; $i < count($followingIdArray); $i++) { 
           array_push($followingProfilesArray, Profile::where('user_id',$followingIdArray[$i]['followee_id'])->get()->first());
        }
        return response()->json([
            'feed'=> $followingProfilesArray
        ]);
        $followingArray = Profile::where('user_id', Follower::where('follower_id', Auth::user()->id)['followee_id'])->get()->toArray();
        return response()->json([
            'feed'=> $followingArray,
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
