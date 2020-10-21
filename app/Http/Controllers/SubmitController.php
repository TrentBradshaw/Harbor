<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CreatePostController extends Controller
{
    
    public function SubmitPost(){
        return view('CreatePost',[
            'data'=> json_encode($data),
            'user'=> $currentUserUsername,
        ]);
    }
   
}
