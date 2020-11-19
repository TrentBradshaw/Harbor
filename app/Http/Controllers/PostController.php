<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Status;
use App\Models\Dock;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function PostForm(){
        return view ('PostSubmitForm');
    }
    public function Store(){
        $json = json_decode(file_get_contents('php://input'), true); //grab request
        $post = new Post();

        $community = Dock::where('title', $json['community'])->get()->toArray();
        $community_id = $community[0]['id'];

        $post->community_id = $community_id;
        $post->creator_id = Auth::user()->id;
        $post->title = $json['title'];
        $post->type = $json['type'];
        $post->text = $json['text'];
        $post->link = $json['url'];
        $post->media_url = $json['media_url'];
        $post->votes = 0;
        $saved = $post->save();
        /*
        if($json['type'] == "text"){

        }

        }else if ($json['type'] == "link"){

        }else if($json['type'] == "media"){

        }

        */
        if ($saved){
            return response()->json([
                'post saved' => true,
            ]);

        }
        else{
            return $json;
        }
        


        /*
        $json = json_decode(file_get_contents('php://input'), true); //grab request
        return $json;
    */}
}
