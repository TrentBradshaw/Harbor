<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PostComment;
use App\Models\PostCommentEngagement;

class PostCommmentEngagementController extends Controller
{

    public function GetVoteStatus(){

        $id = request('userID');
        $postID = request('postID');

        $engagement =  PostCommentEngagement::where('id', $postID)->where('engager_id', $userID)->first();

        return response()->json([
            'upvoted' => $engagement->upvoted,
            'downvoted' => $engagement->downvoted,
        ]);
    }
    public function VoteOnComment(){

        $json = json_decode(file_get_contents('php://input'), true); //grab request
        
        $currentUserID = $json['userID'];
        $targetID = $json['targetID'];
        $upvoted = $json['upvoted'];
        $downvoted = $json['downvoted'];

        $engagement =  PostCommentEngagement::where('id', $targetID)->where('engager_id', $currentUserID)->first();
            
        if ($engagement === null){
            $comment = new PostCommentEngagement();
            
            $comment->engager_id = $currentUserID;
            $comment->comment_id = $targetID;
            $comment->upvoted = $upvoted;
            $comment->downvoted = $downvoted;
            $comment->save();

            return response()->json([
                //so i need
                //127.0.0.1/dock/dockname/postID/posttitle
                'upvoted' => $comment->upvoted,
                'downvoted' => $comment->downvoted,
            ]);

        }else if  ( $engagement){
                if ($upvoted)
                {
                    if ($engagement['upvoted']){
                        $engagement->delete();
                    }
                    if($engagement['downvoted']){
                        $engagement['upvoted'] = true;
                        $engagement['downvoted'] = false;
                        $engagement->save();
                    }
                }
                if ($downvoted)
                {
                    if ($engagement['upvoted']){
                        $engagement['upvoted'] = false;
                        $engagement['downvoted'] = true;
                        $engagement->save();
                    }
                    if($engagement['downvoted']){
                        $engagement->delete();
                    }
                }

                $engagement->refresh();
        return response()->json([
            //so i need
            //127.0.0.1/dock/dockname/postID/posttitle
            'comments' =>$engagement,
        ]);
    }
        // if dislike
        // check if liked
        // unlike 
        // dislike
        //if not liked
        //dislike
        //if disliked
        //undislike
    }
}
