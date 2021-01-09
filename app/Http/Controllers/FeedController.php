<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Status;
use App\Models\Profile;
use App\Models\User;
use App\Models\Dock;
use App\Models\Post;
use App\Models\Follower;
use Illuminate\Support\Facades\Auth;


class FeedController extends Controller
{
    public function index(){
        $user_id - auth()->user()->id();
        $user = User::find($user_id);
        return response()->json([
            'posts' => $user->posts
        ]);
    }
    public function GetFeed(){
        //grab the user with Auth->user()->id
        //see who they follow with Follower::where('follower_id', Auth->user()->id)
        //take that group of followers and grab all of their posts and statements
        //dig into their timestamps, modify them to a maleable format, then get the time between then and now
        //sort them chronologically
        //add the new needed information like a new field "x time ago"
        //pump them all into an array
        //send them back with a return response json
    }
    public function GetHomeFeed(){
        
        $id = Auth()->user()->id;
        $secondaryMeme = array();
        $statuses = Status::where('user_id', $id)->get()->toArray();
        /*
        $secondaryMeme = array_map(function($value){
            $statuses[$value]->pfp_url = Profile::where('user_id', $value['user_id'])->get()->first()['pfp_url'];
        }, $statuses);
        */
        
       foreach ($statuses as $key => $value) {
        $statuses[$key]['username'] = User::where('id', $value['user_id'])->get()->first()['username'];
        //$statuses[$key]['numberOfReplies'] = Status::where('parent_status_id', );
        $statuses[$key]['pfp_url'] = Profile::where('user_id', $value['user_id'])->get()->first()['pfp_url'];           
       }




        return response()->json([
            'feedhomeControllerReached' => $id,
            'meme' => 'yee',
            'statuses' => $statuses,
            'secondaryMeme' =>$secondaryMeme
        ]);
    }
    public function GetUserFeed(){
        $id = request('query');
        $userId = User::where('username', $id)->get()->first()['id'];
        $statuses = Status::where('user_id', $userId)->get()->toArray();

        foreach ($statuses as $key => $value) {
            $statuses[$key]['username'] = User::where('id', $value['user_id'])->get()->first()['username'];
            //$statuses[$key]['numberOfReplies'] = Status::where('parent_status_id', );
            $statuses[$key]['pfp_url'] = Profile::where('user_id', $value['user_id'])->get()->first()['pfp_url']; 
        }  
        return response()->json([
            'feeduserControllerReached' => $id,
            'feed' => $statuses
        ]);
    }
    /*
    public function __invoke($username) {
        $id = request('query');

        $followingArray = (Follower::where('follower_id', $id)->get()->toArray()); //grab the object, enter it and grab the id
        
        //get the userId of the page
        //if it's you then see who you're following
        //get their content
        //grab first piece of content, from following list

        //grab list of people you're following
        //get 10 most recent activities from each person with the current time as the time reference
        //arrange them by time created
        //show a max of 100 items
        //if scrolled to the bottom show the next 50 items with the time of the last item int he array as the time reference
        //repeat


        //aggregate it
        //sort it by time made

        //if it's someone else's content then show theirs


        return response()->json([
            'feedhomeControllerReached' => $followingArray
        ]);
    }
    */
}
