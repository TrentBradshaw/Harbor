<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PostComment;
use App\Models\PostCommentEngagement;
use App\Models\DeletedComment;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class PostCommentsController extends Controller
{
    public function Delete(){
        $json = json_decode(file_get_contents('php://input'), true);
        $comment = PostComment::where('id', $json['id'])->first();
        if(PostComment::where('parent_comment_id', $json['id'])->exists()){
            $comment->creator_id = 0;
            $comment->username ='';
            $comment->updated_at = date('Y-m-d H:i:s');
            $comment->body = '';
            $comment->isDeleted = true;
            $comment->save();
            response()->json(['success' => 'success'], 200);
        }else{
            $comment->delete();
            response()->json(['success' => 'success'], 200);
        }
    }
    public function GetPostComments(){
        $id = request('query');
        $postComments = PostComment::where('parent_post_id', $id)->get()->toArray();

        for ($i=0; $i < count($postComments); $i++) {
            $user =  User::where('id', $postComments[$i]['creator_id'])->get()->toArray();
            $dateAltered = Carbon::parse($postComments[$i]['created_at']);
            $upvotedAmount = Count( PostCommentEngagement::where('comment_id',$postComments[$i]['id'])->where('upvoted', true)->get()->toArray());
            $downvotedAmount = Count( PostCommentEngagement::where('comment_id', $postComments[$i]['id'])->where('downvoted', true)->get()->toArray());
            $voteCount =  $upvotedAmount  -=$downvotedAmount;
            $postComments[$i]['score'] = $voteCount;
            if (Profile::where('user_id', $postComments[$i]['creator_id'])->exists())
                $postComments[$i]['posterPfpUrl'] = Profile::where('user_id', $postComments[$i]['creator_id'])->get()->first()['pfp_url'];
                $postComments[$i]['formattedStamp'] = $dateAltered->format('M/d/Y h:i');
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

        $comment->creator_id = Auth::user()->id;
        $comment->body = $json['body'];
        $comment->parent_post_id = $json['parentPostId'];
        $comment->nest_level = $json['nestLevel'];
        $comment->username = (User::where('id',  Auth::user()->id)->first())['username'];
        $comment->parent_comment_id = $json['parentCommentId'];
        $saved = $comment->save();
        $comment->refresh();
        
        if ($saved){
            $commentGrabbed = PostComment::where('id', $comment->id)->get()->first();
            $commentGrabbed['posterPfpUrl'] = Profile::where('user_id', $comment->creator_id)->get()->first()['pfp_url'];
            $commentGrabbed['score'] = 1;
            $engagement = new PostCommentEngagement();
            $engagement->engager_id = $comment->creator_id;
            $engagement->comment_id = $comment->id;
            $engagement->upvoted = true;
            $engagement->downvoted = false;
            $engagementSaved = $engagement->save();
            if($engagementSaved){
                return response()->json(['comment' =>$commentGrabbed]);
            }
            
        }
    }
}
