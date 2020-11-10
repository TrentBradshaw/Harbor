<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GetCurrentUserController extends Controller
{
    public function __invoke(){
        if (Auth::check()) {
            return response()->json([
                'currentUserID' => Auth::user()->id
            ]);
            
        }
    }
}
