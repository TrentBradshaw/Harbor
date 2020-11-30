import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import Moment from '../Utility/Moment';
import LinkedPost from './LinkedPost';
import TextPost from './TextPost';
import MediaPost from './MediaPost';


    const GetPostType = (type, state) => {
        
        if (type == "link"){
            return(
                <LinkedPost state = {state} ></LinkedPost>
            )
        }
        /*
        if (type === "text"){
            return (
                    <div id="PostHeader">
                        <div id="SubInfoHolder" style={{display: 'flex'}}>
                            <img></img>
                            <h4>{ "d/" + state.communityTitle}</h4>
                            <p>{"Posted by u/" + state.creatorUsername}</p>
                            <Moment timePosted = {state.formattedStamp}></Moment>
                        </div>
                        <div>
                            <p style ={{  minHeight: '100px',  display: "inline-block", width: '100%'}} >{state.text}</p>
                        </div>
                </div>
            )
        }
        else if(type === "media"){
            return (
                    <div id="PostHeader">
                        <div id="SubInfoHolder" style={{ display: 'flex' }}>
                        <img></img>
                            <h4>{ "d/" + state.communityTitle}</h4>
                            <p>{"Posted by u/" + state.creatorUsername}</p>
                        </div>
                        <div>
                            <img src= {state.media_url}></img>
                        </div>
                    </div>
            );
        }
        */
       console.log('yeeeee')
       console.log('type ' + type)
         
    }

    function Post(){
        const [isLoading, setLoading] = useState(true);
        const [state, setNewState] = useState({
            communityTitle: '',
            created_at: "",
            creatorUsername: "",
            text: "",
            media_url: "",
            title: "",
            link: "",
            type: "",
            currentUTCTime: "",
        });

        useEffect(() => {
            fetchData();
        }, []);
        const fetchData = () => {
            let token = document.getElementById('csrf-token').getAttribute('content')

            var url = new URL('http://localhost:80/api/post')
            let param = {query: postID}

            url.search = new URLSearchParams(param).toString();
            fetch(url, {
                headers:{
                    'X-CSRF-TOKEN': token,
                    'Content-Type':'application/json',
                    "Access-Control-Allow-Origin" : "*", 
                    "Access-Control-Allow-Credentials" : true 
                },
                method: 'get',
                mode: "cors",
                credentials: "same-origin",
                }).then((response) => {
                    response.json().then((data) => {
                        console.log(data.postInfo)
                        setNewState(data.postInfo)
                    setLoading(false);
                    console.log(state);
                    });
                })
        }

        if (isLoading) { return <div className="App">Loading...</div> }
        
        return (
            <div>
                <div className="App" style={{ marginLeft: '2%', marginRight: '2%', minHeight: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div id="PostHeader" style={{ width: '70%'}}>
                        <div>
                            <div id="RealPostHeader" style= {{display: 'flex'}}>
                                {GetPostType(state.type, state)}
                            </div>    
                        </div> 
                        <div>
                        <div>
                            <div style={{ marginLeft: '2%', marginRight: '2%', minHeight: '100%'}}>
                                <input type="text"></input>
                                <button>Save</button>
                            </div>
                            <div>
                                <h1>Comment Section loaded below</h1>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div style={{ width: '20%', minHeight: '100%',}}>
                        <div>
                            <h1>Sidebar</h1>
                        </div>
                </div>
                    
                </div>
                
                
                
                
            </div>
            
        );
    }
    
if (document.getElementById('PostContainer')) {
    var postID = document.getElementById('dataHolder').getAttribute('postID');
    
    ReactDOM.render(<Post/>, document.getElementById('PostContainer'));
}
 
export default Post ;