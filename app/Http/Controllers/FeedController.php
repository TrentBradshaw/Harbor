<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Status;
use App\Models\Dock;

class FeedController extends Controller
{
    public function __invoke($username) {

        
        return response()->json([
            'feedhomeControllerReached' => url('/home')
        ]);
    }
}
