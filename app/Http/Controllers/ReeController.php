<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PostComment;
use App\Models\PostCommentEngagement;

class ReeController extends Controller
{
    public function GetVoteStatus(){

        $id = request('userID');
        $postID = request('postID');

        $engagement =  PostCommentEngagement::where('comment_id', $postID)->where('engager_id', $id)->first();
        if ($engagement){
            return response()->json([
                'upvoted' => $engagement->upvoted,
                'downvoted' => $engagement->downvoted,
            ]);
        }
        else {
            return response()->json([
                'upvoted' => false,
                'downvoted' => false,
            ]);
        }
        
    }


    public function VoteOnComment(){

        $json = json_decode(file_get_contents('php://input'), true); //grab request

        $engagement =  PostCommentEngagement::where('comment_id', $json['targetID'])->where('engager_id', $json['userID'])->first();
        

        if ($engagement === null){
            $comment = new PostCommentEngagement();
            
            $comment->engager_id = $json['userID'];
            $comment->comment_id =  $json['targetID'];
            $comment->upvoted = $json['upvoted'];
            $comment->downvoted = $json['downvoted'];
            $comment->save();

            return response()->json([
                //so i need
                //127.0.0.1/dock/dockname/postID/posttitle
                'upvoted' => $comment->upvoted,
                'downvoted' => $comment->downvoted,
            ]);

        }else if  ($engagement){
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
