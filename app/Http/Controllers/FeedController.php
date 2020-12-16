<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Status;
use App\Models\User;
use App\Models\Dock;
use App\Models\Follower;

class FeedController extends Controller
{
    public function __invoke($username) {
        $id = request('query');

        $followingArray = (Follower::where('follower_id', $id)->get()->toArray()); //grab the object, enter it and grab the id
        
        //get the userId of the page
        //if it's you then see who you're following
        //get their content
        //grab first piece of content, from following list

        //grab list of people you're following
        //get 10 most recent activities from each person with the current time as the time reference
        //arrange them by time created
        //show a max of 100 items
        //if scrolled to the bottom show the next 50 items with the time of the last item int he array as the time reference
        //repeat


        //aggregate it
        //sort it by time made

        //if it's someone else's content then show theirs


        return response()->json([
            'feedhomeControllerReached' => $followingArray
        ]);
    }
}
