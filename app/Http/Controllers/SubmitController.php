<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SubmitController extends Controller
{
    
    public function Submit(){

        $data = [];
        $currentUserUsername = 'pickles';
        
        return view('Submit',[
            'data'=> json_encode($data),
            'user'=> $currentUserUsername,
        ]);
    } 
}
