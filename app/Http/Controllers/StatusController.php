<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Status;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *app
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statements = Statement::all();
        return view('statements.index')->with('statements', $statements);
    }
    public function ShowStatus($username, $statusId){
        return view('ShowStatus',[
            'statusId'=> $statusId,
        ]);
    }
    public function GetStatus(){
        $post_id = request('query');
        $status = Status::where('id', $post_id)->get()->first();
        $status['pfp_url'] = Profile::where('user_id', $status['user_id'])->get()->first()['pfp_url'];
        $status['username'] = User::where('id', $status['user_id'])->get()->first()['username'];
        $status['replyCount'] = Count(Status::where('parent_status_id', $post_id)->get()->toArray());
        $replies = Status::where('parent_status_id', $post_id)->get()->toArray();
        
        
       foreach ($replies as $key => $value) {
        $replies[$key]['username'] = User::where('id', $value['user_id'])->get()->first()['username'];
        $replies[$key]['pfp_url'] = Profile::where('user_id', $value['user_id'])->get()->first()['pfp_url'];
        $replies[$key]['replyCount'] = Count(Status::where('parent_status_id', $value['id'])->get()->toArray());
       }
        return response()->json([
            //so i need
            //127.0.0.1/dock/dockname/postID/posttitle
            'status'=> $status,
            'replies' => $replies,
        ]);
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

        $status = new Status();
        $status->body = $json['body'];
        $status->user_id = Auth::user()->id;
        $status->is_reply = $json['isReply'];
        $status->parent_status_id = $json['parentStatusId'];
        
        $saved = $status->save();
        $status->refresh();
        if ($saved){
            $status->username = User::where('id', Auth::user()->id)->get()->first()['username'];
            //$statuses[$key]['numberOfReplies'] = Status::where('parent_status_id', );
            $status->pfp_url = Profile::where('user_id', Auth::user()->id)->get()->first()['pfp_url']; 
            return response()->json([
                //so i need
                //127.0.0.1/dock/dockname/postID/posttitle
                'status'=> $status
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
        return  Statement::find($id);
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
    public function DeleteStatus(Request $request)
    {
        $json = json_decode(file_get_contents('php://input'), true); //grab request
        Status::where('id', $json['statusId'])->first()->delete();
        return response()->json([
            'State' => 'deleted',
        ]);
    }
}
