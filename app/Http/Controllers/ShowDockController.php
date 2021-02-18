<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MediaDock;
use App\Models\TextDock;
use App\Models\UrlDock;
use App\Models\User;
use App\Models\Following;
use Illuminate\Support\Facades\Auth;

class ShowDockController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //Reinstate this when you have a better method of checking auth at home page.
        //Use a remember me function and if they have some session or cookies then run auth
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * 
     */

    public function ShowDock(){
        if (Auth::check()) {
            
            $statements_array =[];
            $data = array();
            $data['userInfo']  =  array(
                //make all of this the profile info object
                //"user" = User::where('id', Auth::user()->id)->get()->toArray();
                //"username" => $username,
                // "pfp_url" => $pfp_url,
                // "description" =>  $description,
                //  "followers_count" => $followers_count,
                //  "followed_count" => $followed_count,
                //  "statements_count" => $statements_count,
                // "topics_count" => $topics_count,
            );
            $data['feedInfo'] = array(
                //PUMP THE DATA INTO HERE WITH A FOR LOOP!
            );
            
            foreach ($statements_array as $key => $value) {
                array_push($data['feedInfo'], $value);
            }  
            
            $currentUser = User::where('id', Auth::user()->id)->get()->toArray();
            //print_r($currentUser[0]['username']);
            $currentUserUsername = $currentUser[0]['username'];
           // print_r($currentUserUsername);
                return view('ShowDock',[
                    'data'=> json_encode($data),
                    'user'=> $currentUserUsername,
                ]);
        }
        else{
            return view('welcome');
        }
    }
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
        $json = json_decode(file_get_contents('php://input'), true);
        error_log(gettype($json));
        
        
        $highlighted = $json["highlighted"];
        $title = $json["title"];
        $tags = $json["tags"];
        $spoiler = $json["spoiler"];
        $nsfw =  $json["nsfw"];
        $creator = $json["creator"];
        $timeCreated = $json["timeCreated"];
        $body =  $json["body"];
        $media_url = $json["media_url"];
        $url =  $json["url"];
        
        switch ($highlighted) {
            case 'text':
                $textDock = new TextDock();
                $textDock->title = $title;
                $textDock->tags = $tags;
                $textDock->spoiler = $spoiler;
                $textDock->nsfw = $nsfw;
                $textDock->creator = $creator;
                $textDock->created_at = date('Y-m-d H:i:s');
                $textDock->updated_at = date('Y-m-d H:i:s');
                $textDock->body = $body;
                error_log($textDock);
                $textDock->save();
                

                break;
            case 'media':
                $mediaDock = new MediaDock();
                $mediaDock->title = $title;
                $mediaDock->tags = $tags;
                $mediaDock->spoiler = $spoiler;
                $mediaDock->nsfw = $nsfw;
                $mediaDock->creator = $creator;
                $mediaDock->timeCreated = DateTime()->format('Y-m-d H:i:s');
                $mediaDock->url = $media_url;
                $mediaDock->save();
                break;
            case 'link':
                $urlDock = new UrlDock();
                $urlDock->title = $title;
                $mediaDock->tags = $tags;
                $mediaDock->spoiler = $spoiler;
                $mediaDock->nsfw = $nsfw;
                $mediaDock->creator = $creator;
                $mediaDock->timeCreated = DateTime()->format('Y-m-d H:i:s');
                $mediaDock->url = $media_url;
                $urlDock->save();
                    break;
            
            default:
                # code...
                break;
        }
        return response()->json([
            'redirect' => url('/home')
        ]);
    }
    public function goToHomeView()
    {
        return view('home');
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
    public function destroy($id)
    {
        //
    }
}
