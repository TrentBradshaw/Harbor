<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Follower;
use App\Models\FollowCount;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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
    public function Grab(){
        $query = request('followee');
        $followee_id = User::where('username', $query)->first()['id'];
        $following = Follower::where('follower_id', Auth::user()->id)->where('followee_id', $followee_id)->first();
       
        if ($following === null){
            return response()->json([
                'following' => false,
                'collection' => $following
            ]);
        }
        else{
            return response()->json([
                'following' => true
            ]);
        }
       
    }
    public function Store(Request $request)
    {
        $json = json_decode(file_get_contents('php://input'), true); //grab request
        
        //grab follower and followee(target)
    

        $followee_id = User::where('username',  $json['followee'])->first()['id'];
       
        
        //bring in the Follower model
        $following = new Follower();
        $following->follower_id = Auth::user()->id;
        $following->followee_id = $followee_id;
        $following->save();
        
       return response()->json([
            'redirect' => 'WEE'
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
    public function Destroy()
    {

        $json = json_decode(file_get_contents('php://input'), true); //grab request
    
        //grab follower and followee(target)
        

         //grab the object, enter it and grab the id
        $followee_id = User::where('username', $json['followee'])->first()['id'];
        
        Follower::where('follower_id', Auth::user()->id)->where('followee_id', $followee_id)->delete();
    

       return response()->json([
            'redirect' => url('/home')
        ]);
    }
}
