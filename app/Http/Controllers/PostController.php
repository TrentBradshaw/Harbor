<?php

namespace App\Http\Controllers;

use DateTime;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Carbon\Carbon;
use App\Models\Status;
use App\Models\Dock;
use App\Models\PostComment;
use App\Models\Profile;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;


use App\Includes\GetUrlMetaData;


class PostController extends Controller
{    
    protected $dates = ['name_field'];
    public function PostForm(){
        return view ('PostSubmitForm');
    }
    public function Store(){
        

        $json = json_decode(file_get_contents('php://input'), true);
        $post = new Post();
        $post->media_url = $json['url'];
        $community = Dock::where('title', $json['community'])->get()->first();
        $community_id = $community->id;

        $post->community_id = $community_id;
        $post->creator_id = Auth::user()->id;
        $post->title = $json['title'];
        $post->type = $json['type'];
        $post->text = $json['text'];
        $post->link = $json['url'];
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
                        'post' =>$post,
                        'url' =>$url,
                    ]);
            }
        }
        else{
            return $json;
        }
    }
    public function ShowPost($community, $id, $title){
        return view('ShowPost',
                [
                    'postID'=> $id,
                    
                ]);
        return view ('ShowPost');
    }
    public function DeletePost(){
        $json = json_decode(file_get_contents('php://input'), true); //grab request
        Post::where('id', $json['postId'])->first()->delete();
        return response()->json([
            'State' => 'deleted',
        ]);
    }
    public function GetPost(){

        $id = request('query');
        $postInfo = Post::where('id', $id)->get()->first();
        $community = Dock::where('id', $postInfo['community_id'])->get()->first();
        $user = User::where('id', $postInfo['creator_id'])->get()->first();
        $communityTitle = $community['title'];

        $postInfo["communityTitle"] = $community['title'];
        $postInfo["creatorUsername"] = $user['username'];
        $date = date('Y-m-d h:i:s', strtotime($postInfo['created_at']));
        $dateAltered = Carbon::parse($postInfo->created_at);
        $postInfo['created_at'] ->format('d/m/Y h:i:s');
        $postInfo['formattedStamp'] = $dateAltered->format('M/d/Y h:i');
        $postInfo['posterPfpUrl'] = Profile::where('user_id', $user->id)->get()->first()['pfp_url'];
        $postInfo['commentCount'] = Count(PostComment::where('parent_post_id', $id)->get()->toArray());

        if ($postInfo['type'] == "link"){
            $UrlMetaDataGetter = new GetUrlMetaData();
            $test = $UrlMetaDataGetter->getCurrentUrlMetaData($postInfo['link']);
            $postInfo['grabbedData'] = $test;
        }
        
        return response()->json([
            'postInfo' => $postInfo,
        ]);
    }
    
}
