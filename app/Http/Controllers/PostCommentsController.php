<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PostComment;
use App\Models\CommentEngagement;
use App\Models\User;
use Carbon\Carbon;

class PostCommentsController extends Controller
{

    
    public function GetPostComments(){
        $id = request('query');
        $postComments = PostComment::where('parent_post_id', $id)->get()->toArray();

        for ($i=0; $i < count($postComments); $i++) {
            $user =  User::where('id', $postComments[$i]['creator_id'])->get()->toArray();
            $dateAltered = Carbon::parse($postComments[$i]['created_at']);
            //$postComments[$i]['created_at']->format('d/m/Y h:i:s');
            $postComments[$i]['formattedStamp'] = $dateAltered->format('M/d/Y h:i');
            $postComments[$i]['username'] =  $user[0]['username'];
        }


        return response()->json([
            //so i need
            //127.0.0.1/dock/dockname/postID/posttitle
            'comments' =>$postComments,
        ]);
    }
    public function Store() {

        $json = json_decode(file_get_contents('php://input'), true); //grab request
        
        $comment = new PostComment();

        $comment->creator_id = $json['creator_id'];
        $comment->body = $json['body'];
        $comment->parent_post_id = $json['parentPostId'];
        $comment->nest_level = $json['nestLevel'];
        $comment->parent_comment_id = $json['parentCommentId'];
       // $comment->parent_comment_id = $json['parentCommentId'];
        //$comment->parent_post_id = $json['parentPostId'];

        $saved = $comment->save();
        $comment->refresh();

        
        if ($saved){
            $commentGrabbed = PostComment::where('id', $comment->id)->get();
            return response()->json([
                //so i need
                //127.0.0.1/dock/dockname/postID/posttitle
                'comment' =>$commentGrabbed->first(),
            ]);
        }
/*
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
        */
        
    }
}
