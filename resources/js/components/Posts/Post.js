import ReactDOM from 'react-dom';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Moment from '../Utility/Moment';

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

            var url = new URL('http://127.0.0.1:8000/api/post')
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

        if (isLoading) {
            return <div className="App">Loading...</div>
        }
        console.log(state.type)
        if (state.type === "text"){
        
            console.log(state.type + " " + state.communityTitle)
            return (
                <div className="App"
                style={{
                    width :'800px',
                    marginRight: '20%',
                    marginLeft: '20%',

                }}
                >
                    <div id="PostHeader">
                        <div id="SubInfoHolder"
                        style={{
                            display: 'flex'
                        }}>
                            <img></img>
                            <h4>{ "d/" + state.communityTitle}</h4>
                            <p>{"Posted by u/" + state.creatorUsername}</p>
                            <Moment timePosted = {state.formattedStamp}></Moment>
                        </div>
                        <div>
                            <p
                            style ={{
                                minHeight: '100px',
                                display: "inline-block",
                                width: '100%'
                            }}
                            >{state.text}</p>
                        </div>
                        <div>
                            <p>x commments</p>
                            <p>Like</p>
                            <p>Dislike</p>
                        </div>
                        
                    </div>
                </div>
                );
        } else if (state.type === "media"){
            return (
                <div className="App">
                    <h1>
                        YEEEEEEEEEEEEEEEEEEEEEET
                    </h1>
                </div>
            );
        }
        else /*type == link */ {
            return (
                <div className="App">
                    <h1>
                        YEEEEEEEEEEEEEEEEEEEEEET
                    </h1>
                </div>
            );
        }
        
    }
    
if (document.getElementById('PostContainer')) {
    var postID = document.getElementById('dataHolder').getAttribute('postID');
    
    ReactDOM.render(<Post/>, document.getElementById('PostContainer'));
}
 
export default Post ;