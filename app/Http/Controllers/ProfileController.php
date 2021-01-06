<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use App\Models\PostComment;
use App\Models\Follower;
use App\Models\Profile;

class ProfileController extends Controller
{
    public function __invoke(){
        $usernameFromGet = request('query');
        $profileOwnerInfo = User::where('username', $usernameFromGet)->get()->first();
        $profile = Profile::where('user_id', $profileOwnerInfo['id'])->get()->first();
        $profileOwnerInfo['headerUrl'] = $profile['header_url'];
        $profileOwnerInfo['pfpUrl'] = $profile['pfp_url'];
        $profileOwnerInfo['description'] = $profile['description'];
        $profileOwnerInfo['followingCount'] = Count(Follower::where('follower_id', $profileOwnerInfo['id'])->get()->toArray());
        $profileOwnerInfo['followersCount'] = Count(Follower::where('followee_id', $profileOwnerInfo['id'])->get()->toArray());
        //also feed in the followers/following and contributions
        //$profileOwnerInfo['created_at'] = date($profileOwnerInfo['created_at'])->format('Y-m-d H:i:s');
        $profileOwnerInfo['meme'] = date('Y-m-d H:i:s', strtotime( $profileOwnerInfo['created_at']." GMT-8"));
        date_default_timezone_set('America/Los_Angeles');
        $profileOwnerInfo['now'] = date("Y-m-d H:i:s", time());
        $profileOwnerInfo['diffy'] = date_diff(date_create($profileOwnerInfo['meme']),date_create($profileOwnerInfo['now']));
       
        $diffy = date_diff(date_create($profileOwnerInfo['meme']),date_create($profileOwnerInfo['now']));
        $timeAgoString = '';
        if($diffy->y > 0){
            if($diffy->y > 1)
                $timeAgoString = $diffy->y . ' '. 'years ago';
            else
                $timeAgoString = $diffy->y . ' '. 'year ago';
        }
        else if($diffy->m > 0){
            if($diffy->m > 1)
                $timeAgoString = $diffy->m . ' '. 'months ago';
            else
                $timeAgoString = $diffy->m . ' '. 'month ago';
        }
        else if($diffy->d > 0){
            if($diffy->d > 1)
                $timeAgoString = $diffy->d . ' '. 'days ago';
            else
                $timeAgoString = $diffy->d . ' '. 'day ago';
        }
        else if($diffy->h > 0){
            if($diffy->h > 1)
                $timeAgoString = $diffy->h . ' '. 'hours ago';
            else
                $timeAgoString = $diffy->h . ' '. 'hour ago';
        }
        else if($diffy->i > 0){
            if($diffy->i > 1)
                $timeAgoString = $diffy->i . ' '. 'minutes ago';
            else
                $timeAgoString = $diffy->i . ' '. 'minute ago';
        }else if($diffy->s > 0){
            if($diffy->s  > 1)
                $timeAgoString = $diffy->s  . ' '. 'seconds ago';
            else
                $timeAgoString = $diffy->s  . ' '. 'second ago';
        }
        $profileOwnerInfo['joinedAgo'] = $timeAgoString;
       // $interval = date_diff($date,$ndf);
        //$profileOwnerInfo['joinedAgo'] = $interval->format('%h:%i:%s');
//  /// //  //  /   /   /   /   /   /   /   /   /   /   //      //  /   /   /   /   /   /   /   /   /   //  /

        return response()->json([
            'profileOwnerInfo' => $profileOwnerInfo
        ]);
        


        //get their profile pictures
        //count their followers and following
        //count their contribution via counting posts AND comments
        
    }
}
