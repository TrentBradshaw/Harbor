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

    public function GetHomeFeed(){
        
        $id = Auth()->user()->id;
        $secondaryMeme = array();
        $statuses = Status::where('user_id', $id)->get()->toArray();
        
       foreach ($statuses as $key => $value) {
            $statuses[$key]['username'] = User::where('id', $value['user_id'])->get()->first()['username'];
            $statuses[$key]['pfp_url'] = Profile::where('user_id', $value['user_id'])->get()->first()['pfp_url'];     
            $statuses[$key]['replyCount'] = Count(Status::where('parent_status_id', $value['id'])->get()->toArray());
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
            $statuses[$key]['pfp_url'] = Profile::where('user_id', $value['user_id'])->get()->first()['pfp_url'];
            $statuses[$key]['replyCount'] = Count(Status::where('parent_status_id', $value['id'])->get()->toArray());
        }  
        return response()->json([
            'feeduserControllerReached' => $id,
            'feed' => $statuses
        ]);
    }
}
