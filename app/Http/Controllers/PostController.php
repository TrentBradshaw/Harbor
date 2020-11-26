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
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    protected $dates = ['name_field'];
    public function PostForm(){
        return view ('PostSubmitForm');
    }
    public function Store(){
        $json = json_decode(file_get_contents('php://input'), true); //grab request
        
        $post = new Post();

        $base64img = str_replace('data:image/jpeg;base64,', '', $json['file']);

        $client = new Client();

        $response = $client->request('POST', 'https://api.imgur.com/3/image', [
            'headers' => [
                'authorization' => 'Client-ID ' . 'c78aa8ec43c1b04',
                'content-type' => 'application/x-www-form-urlencoded',
            ],
            'form_params' => [
                'image' => $base64img
            ],
        ]);
    return response()->json(json_decode(($response->getBody()->getContents())));
    /*    
    $res = $client->request('POST', 'https://api.imgur.com/3/upload', 
        [
            'headers' => [
                'Authorization' =>  'c78aa8ec43c1b04' //ENV('IMGUR_API_KEY')
            ]
        ],
        [   
            'image' =>  'https://i.redd.it/u32uiq7kv3d31.jpg' //$json['file'],
        ]);

        return response()->json([
        
            'res' =>$res
        ]);
        

    */
        //$file = $json['file'];

       // $response = cloudinary()->upload($file)->getRealPath()->getSecurePath();
        $community = Dock::where('title', $json['community'])->get()->toArray();
        $community_id = $community->first()->id;

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
                        'res' =>$response
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
        $community = Dock::where('id', $postInfo['community_id'])->get()->first();
        $user = User::where('id', $postInfo['creator_id'])->get()->first();
        $communityTitle = $community['title'];

        $postInfo["communityTitle"] = $community['title'];
        $postInfo["creatorUsername"] = $user['username'];
        $date = date('Y-m-d h:i:s', strtotime($postInfo['created_at']));
        //$postInfo['created_at'] =    
       // $created_at = new Carbon($value)->toDateTimeString();
        //$postInfo->created_at = new Carbon($postInfo->created_at)->toDateTimeString();
        //$postInfo->created_at->format('Y-m-d H-m-s');
        $dateAltered = Carbon::parse($postInfo->created_at);
        $postInfo['created_at'] ->format('d/m/Y h:i:s');
        $postInfo['formattedStamp'] = $dateAltered->format('M/d/Y h:i');
       

        
        return response()->json([
            'postInfo' => $postInfo,
        ]);
    }
    
}
