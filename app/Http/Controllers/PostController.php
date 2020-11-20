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
        $post->refresh();
        if ($saved){
            $postGrabbed = Post::
            where('community_id', $community_id)
            ->where('title', $json['title'])
            ->where('creator_id', Auth::user()->id)
            ->get();
            
            if ($postGrabbed){
                $dock = Dock::where('id', $postGrabbed->first()->community_id)->get();
            

                $postTitle = $postGrabbed->first()->title;
                $dockName = $dock->first()->title;
                $postID = $postGrabbed->first()->id;
    
                $url = '/' . 'dock/' . $dockName . '/' . $postID . '/' . $postTitle;
                
                    return response()->json([
                        //so i need
                        //127.0.0.1/dock/dockname/postID/posttitle
                        'url' =>$url,
                    ]);
    
            }

           
        }
        else{
            return $json;
        }
        


        /*
        $json = json_decode(file_get_contents('php://input'), true); //grab request
        return $json;
    */}
    public function ShowPost($community, $id, $title){
        return view('ShowPost',
                [
                    'postID'=> $id,
                    
                ]);
        return view ('ShowPost');
    }
    public function GetPost(){

        $id = request('query');
        $postInfo = Post::where('id', $id)->get()->first();
        /*
        $username = $postInfo[0]['username'];
        $pfp_url = $postInfo[0]['pfp_url'];
        $description =  $postInfo[0]['description'];
        */
        return response()->json([
            'newArray' => $postInfo,
        ]);
        

    }
}
