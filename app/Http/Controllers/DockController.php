<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResourceCollection;
use App\Models\Status;
use App\Models\Dock;
use App\Models\Follower;
use Illuminate\Support\Facades\Auth;


class DockController extends Controller
{

     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    
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
        error_log(json_encode($json));
        $title = $json['dockTitle'];
        $dock = new Dock();
        $dock->creator_id = Auth::user()->id;
        $dock->title = $json['dockTitle'];
        $dock->description = $json['dockDescription'];
        if ($dock->save()){
            return response()->json([
                'dock_added' => true,
                'dock_url_title' => $title,
            ]);

        }
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

    }

   public function SubmitForm(){
    return view('DockSubmitForm',
    [
       
        
    ]);
   }
   public function GetDocks(){
       $dock = new Dock();
       $query = request('query');
       $queryList = Dock::where('title', 'LIKE', '%' . $query . '%')->get()->toArray();
       if ($queryList != null){
        $queryArray = array();
       
        for ($i=0; $i < count($queryList); $i++) { 
            $currentTitle =  $queryList[$i]['title'];
            array_push($queryArray, $currentTitle);
        }
        if (count($queryList) < 1){
            $queryArray = 'null';
        }
 
        if  ($queryList){
             return response()->json([
                 'newArray' => $queryArray,
             ]);
        }
       }
       else{
        return response()->json([
            'newArray' => [],
        ]);
       }
       
    
    

   }
   public function GetDockPosts(){
    return response()->json([
        'GetDockPosts' => 'HELLO',
    ]);
   }
   public function CheckVoteStatus(){

   }
}
