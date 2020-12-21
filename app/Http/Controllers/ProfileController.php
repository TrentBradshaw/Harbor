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

        //also feed in the followers/following and contributions



//  /// //  //  /   /   /   /   /   /   /   /   /   /   //      //  /   /   /   /   /   /   /   /   /   //  /

        return response()->json([
            'profileOwnerInfo' => $profileOwnerInfo
        ]);
        


        //get their profile pictures
        //count their followers and following
        //count their contribution via counting posts AND comments
        
    }
}
