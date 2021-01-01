<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PostComment;
use App\Models\PostCommentEngagement;
use App\Models\PostEngagement;
use App\Models\StatusEngagement;
use Illuminate\Support\Facades\Auth;

class ReeController extends Controller
{
    public function GetCurrentVoteStatus(){
        
        $type = request('type');
        /*
        $postId = request('targetId');
        $engagement =  PostCommentEngagement::where('comment_id', $postId)->where('engager_id',  Auth::user()->id)->first();
        if ($engagement){
            return response()->json([
                'upvoted' => 'ee',
                'downvoted' =>'wf',
                'score' =>  0
            ]);
        }else{
            return response()->json([
                'upvoted' => 'no',
                'downvoted' =>'also  no',
                'score' =>  1000
            ]);
        }
        */
        
        if ($type === 'status'){
            $statusId = request('targetId');
            $engagement =  StatusEngagement::where('status_id', $statusId)->where('engager_id',  Auth::user()->id)->first();
            $upvotedAmount = Count( StatusEngagement::where('status_id', $statusId)->where('upvoted', true)->get()->toArray());
            $downvotedAmount = Count( StatusEngagement::where('status_id', $statusId)->where('downvoted', true)->get()->toArray());
            $voteCount =  $upvotedAmount  -=$downvotedAmount;
            if ($engagement){
                return response()->json([
                    'upvoted' => $engagement->upvoted === 1 ? true: false,
                    'downvoted' => $engagement->downvoted === 1 ? true: false,
                    'count' => $voteCount
                ]);
            }else {
                return response()->json([
                    'upvoted' => false,
                    'downvoted' => false,
                ]);
            }   
        }else if($type === 'postComment'){
            $postId = request('targetId');
            $engagement =  PostCommentEngagement::where('comment_id', $postId)->where('engager_id', Auth::user()->id)->first();
            $upvotedAmount = Count( PostCommentEngagement::where('comment_id', $postId)->where('upvoted', true)->get()->toArray());
            $downvotedAmount = Count( PostCommentEngagement::where('comment_id', $postId)->where('downvoted', true)->get()->toArray());
            $voteCount =  $upvotedAmount  -=$downvotedAmount;
            if ($engagement){
                return response()->json([
                    'upvoted' => $engagement->upvoted === 1 ? true: false,
                    'downvoted' => $engagement->downvoted === 1 ? true: false,
                    'score' => $voteCount
                ]);
            }else {
                return response()->json([
                    'upvoted' => false,
                    'downvoted' => false,
                    'score' => 0
                    
                ]);
            }   
        }else if($type === 'post'){
            $postId = request('targetId');
            $engagement =  PostEngagement::where('post_id', $postId)->where('engager_id',  Auth::user()->id)->first();
            $upvotedAmount = Count( PostEngagement::where('post_id', $postId)->where('upvoted', true)->get()->toArray());
            $downvotedAmount = Count( PostEngagement::where('post_id', $postId)->where('downvoted', true)->get()->toArray());
            $voteCount =  $upvotedAmount  -=$downvotedAmount;
            if ($engagement){
                return response()->json([
                    'upvoted' => $engagement->upvoted === 1 ? true: false,
                    'downvoted' => $engagement->downvoted === 1 ? true: false,
                    'score' => $voteCount
                ]);
            }else {
                return response()->json([
                    'upvoted' => false,
                    'downvoted' => false,
                    'score' =>  0
                ]);
            }   
        }
        
    }

    public function VoteOnContent(){

        $json = json_decode(file_get_contents('php://input'), true); //grab request
        /*
        return response()->json([
            'type'=>$json['type'],
            'upvoted'=>$json['choseUpvoted'],
            'downvoted'=>$json['choseDownvoted']
        ]);*/
        if ($json['type'] === 'status')
        {
            $engagement =  StatusEngagement::where('status_id', $json['targetId'])->where('engager_id',  Auth::user()->id)->first();
            $comment = new StatusEngagement();
            $comment->status_id =  $json['targetId'];
        }else if ($json['type'] === 'postComment'){
            $engagement =  PostCommentEngagement::where('comment_id', $json['targetId'])->where('engager_id',  Auth::user()->id)->first();
            $comment = new PostCommentEngagement();
            $comment->comment_id =  $json['targetId'];
        }
        else if($json['type'] === 'post'){
            $engagement =  PostEngagement::where('post_id', $json['targetId'])->where('engager_id',  Auth::user()->id)->first();
            $comment = new PostEngagement();
            $comment->post_id =  $json['targetId'];
           
        }
            
        if ($engagement === null){
            $comment->engager_id = Auth::user()->id;
            $comment->upvoted = $json['choseUpvoted'];
            $comment->downvoted = $json['choseDownvoted'];
            $comment->save();

            return response()->json([
                'upvoted' => $comment->upvoted === 1 ? true: false,
                'downvoted' => $comment->downvoted === 1 ? true: false,
            ]);

        }else{
            if ($json['choseUpvoted'] === true){
                if ($engagement->upvoted === 1){
                    $engagement->delete();
                    return response()->json([
                        'upvoted' =>false,
                        'downvoted' =>false,
                        'state' =>'chose  upvoted and engagement is upvoted already',
                        'engagement upvoted state' => $engagement->upvoted
                    ]);
                }
                    
            
                if($engagement->downvoted === 1){
                    $engagement->upvoted = true;
                    $engagement->downvoted = false;
                    $engagement->save();
                    $engagement->refresh();
                return response()->json([
                    //so i need
                    //127.0.0.1/dock/dockname/postID/posttitle
                    'upvoted' =>$engagement->upvoted,
                    'downvoted' =>$engagement->downvoted,
                    'engagement' =>$engagement
                ]);
                }
            }
            else if ($json['choseDownvoted'] === true)
            {
                if ($engagement->upvoted ===  1){
                    $engagement->upvoted = false;
                    $engagement->downvoted = true;
                    $engagement->save();
                    $engagement->refresh();
                return response()->json([
                    //so i need
                    //127.0.0.1/dock/dockname/postID/posttitle
                    'upvoted' =>$engagement->upvoted,
                    'downvoted' =>$engagement->downvoted,
                    'engagement' =>$engagement
                ]);
                }
                if($engagement->downvoted ===  1){
                    $engagement->delete();
                    return response()->json([
                        'upvoted' =>false,
                        'downvoted' =>false,
                        'state' =>'chose  downvoted and engagement is downvoted already'
                    ]);
                }
                    
            }
        }
    }
}
