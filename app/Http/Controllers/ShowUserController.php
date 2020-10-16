<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Statement;
use App\Models\Following;
use Illuminate\Support\Facades\Auth;

class ShowUserController extends Controller
{
    
    public function ShowUser($username){
        if (Auth::check()) {
            $data = array();
            return view('showUser')->with('data', json_encode($data)); //json_encode($data)
        }
    }
}
