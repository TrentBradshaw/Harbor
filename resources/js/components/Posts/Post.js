import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import LinkedPost from './LinkedPost';
import TextPost from './TextPost';
import VotingSystem from './VotingSystem';
import Moment from '../Utility/Moment';
import MediaPost from './MediaPost';
import PostComments from '../Comments/PostComments'

    const GetPostType = (type, state) => {
        
        if (type == "link"){return(<LinkedPost state = {state} ></LinkedPost>)}
        else if (type === "text"){return (<TextPost state = {state}></TextPost>)}
        else if(type === "media"){return(<MediaPost state = {state}></MediaPost>)}
    }

    function Post(props){
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
            let url = new URL('http://localhost:80/api/post')
            let param = {query: props.postId}

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
                    console.log(state + ' state');
                    });
                })
        }

        if (isLoading) { return <div className="App">Loading...</div> }
        
        return (
            <div>
                <div className="App" style={{ marginLeft: '2%', marginRight: '2%', minHeight: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div id="PostHeader" style={{ width: '70%', backgroundColor: 'white'}}>
                        <VotingSystem id={props.postId} type={'post'}></VotingSystem>
                        <div id= '2' style ={{width: '100%'}}>
                        <h2 style = {{height: '45%'}}>{state.title}</h2>
                        <div style = {{display: 'flex', marginTop: '15px'}}>
                            <Moment creator = {state.creatorUsername} timePosted = {state.formattedStamp}></Moment>
                            <p>{state.commentCount + ' comments'}</p>
                            <p onClick= {() =>{
                                var Url = 'http://localhost/dock/' + state.communityTitle + '/' + state.id + '/' + state.title;
                                var dummy = document.createElement("textarea");
                                dummy.style.display = 'none'
                                document.body.appendChild(dummy);
                                dummy.value = Url;
                                dummy.select();
                                document.execCommand("copy");
                                document.body.removeChild(dummy);
                                }}
                                >share</p>
                        </div>
                            <div id="RealPostHeader" style= {{display: 'flex'}}>
                                {GetPostType(state.type, state)}
                            </div>    
                        </div> 
                        <div>
                        <div>
                            <div>
                                <PostComments parentPostId = {state.id}></PostComments>
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
    let postId = document.getElementById('dataHolder').getAttribute('postID');
    ReactDOM.render(<Post postId = {postId} />, document.getElementById('PostContainer'));
}