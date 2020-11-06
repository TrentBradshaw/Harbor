<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Follower;
use App\Models\User;

class FollowerController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statements = Statement::all();
        return view('statements.index')->with('statements', $statements);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $json = json_decode(file_get_contents('php://input'), true); //grab request
    
        //grab follower and followee(target)
        $follower = $json['following'];
        $followee = $json['followee'];

        $follower_id = (User::where('username', $follower)->get()->toArray())[0]['id'];  //grab the object, enter it and grab the id
        $followee_id = (User::where('username', $followee)->get()->toArray())[0]['id'];
        
        //bring in the Follower model
        $following = new Follower();
        $following->follower_id = $follower_id;
        $following->followee_id = $followee_id;
        $following->save();

       return response()->json([
            'redirect' => url('/home')
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @param string $username
     * @return \Illuminate\Http\Response
     */
    public function show($username, $id)
    {
       
        //return view ('statements.show')->with('statement', $statement);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($usernameToUnfollow)
    {

        $json = json_decode(file_get_contents('php://input'), true); //grab request
    
        //grab follower and followee(target)
        $follower = $json['following'];
        $followee = $json['followee'];

        $follower_id = (User::where('username', $follower)->get()->toArray())[0]['id'];  //grab the object, enter it and grab the id
        $followee_id = (User::where('username', $followee)->get()->toArray())[0]['id'];
        
        Follower::where('follower_id', $follower_id)->where('followee_id', $followee_id)->delete();
    

       return response()->json([
            'redirect' => url('/home')
        ]);
    }
}
