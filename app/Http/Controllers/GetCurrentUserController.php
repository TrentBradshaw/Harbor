<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\Profile;
use App\Http\Resources\UserResourceCollection;
use Illuminate\Support\Facades\Auth;

class GetCurrentUserController extends Controller
{
    public function __invoke(){
        if (Auth::check()) {
            $user = User::where('id', Auth::user()->id)->get()->toArray();
            return response()->json([
                'username' => $user[0]['username'],
                'id' => Auth::user()->id,
                'pfpUrl' => Profile::where('user_id', Auth::user()->id)->first()['pfp_url']
            ]);
        }
    }
}
