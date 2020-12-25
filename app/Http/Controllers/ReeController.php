<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PostComment;
use App\Models\PostCommentEngagement;
use App\Models\StatusEngagement;

class ReeController extends Controller
{
    public function GetCurrentVoteStatus(){
        $user_Id = request('userId');
        $type = request('type');
        $engagement;
        if ($type === 'status'){
            $statusId = request('targetId');
            $engagement =  StatusEngagement::where('status_id', $statusId)->where('engager_id', $user_Id)->first();
        }else if($type === 'postComment'){
            $postId = request('targetId');
            $engagement =  PostCommentEngagement::where('comment_id', $postId)->where('engager_id', $user_Id)->first();
        }
        if ($engagement){
            return response()->json([
                'upvoted' => $engagement->upvoted === 1 ? true: false,
                'downvoted' => $engagement->downvoted === 1 ? true: false,
            ]);
        }else {
            return response()->json([
                'upvoted' => false,
                'downvoted' => false,
                'engagement' => $engagement
            ]);
        }   
    }

    public function VoteOnContent(){

        $json = json_decode(file_get_contents('php://input'), true); //grab request

        if ($json['type'] === 'status')
        {
            $engagement =  StatusEngagement::where('status_id', $json['targetId'])->where('engager_id', $json['userId'])->first();
            $comment = new StatusEngagement();
            $comment->status_id =  $json['targetId'];
        }else if ($json['type'] === 'comment'){
            $engagement =  PostCommentEngagement::where('comment_id', $json['targetId'])->where('engager_id', $json['userId'])->first();
            $comment = new PostCommentEngagement();
            $comment->comment_id =  $json['targetId'];
        }
            
        if ($engagement === null){
            $comment->engager_id = $json['userId'];
            $comment->upvoted = $json['upvoted'];
            $comment->downvoted = $json['downvoted'];
            $comment->save();

            return response()->json([
                //so i need
                //127.0.0.1/dock/dockname/postID/posttitle
                'upvoted' => $comment->upvoted,
                'downvoted' => $comment->downvoted,
            ]);

        }else{
            if ($json['upvoted']){
                if ($engagement['upvoted'])
                {
                    $engagement->upvoted = false;
                    $engagement->delete();
                }
                
                if($engagement['downvoted']){
                    $engagement['upvoted'] = true;
                    $engagement['downvoted'] = false;
                    $engagement->save();
                }
            }
            else if ($json['downvoted'])
            {
                if ($engagement['upvoted']){
                    $engagement['upvoted'] = false;
                    $engagement['downvoted'] = true;
                    $engagement->save();
                }
                if($engagement['downvoted']){
                    $engagement->downvoted = false;
                    $engagement->delete();
                }
            }
            if($engagement){
                $engagement->refresh();
                return response()->json([
                    //so i need
                    //127.0.0.1/dock/dockname/postID/posttitle
                    'upvoted' =>$engagement->upvoted,
                    'downvoted' =>$engagement->downvoted,
                ]);
            }else{
                return response()->json([
                    'upvoted' =>false,
                    'downvoted' =>false
                ]);
            }   
        }
    }
}
