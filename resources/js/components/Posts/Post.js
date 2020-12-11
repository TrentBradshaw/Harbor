import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import LinkedPost from './LinkedPost';
import TextPost from './TextPost';
import MediaPost from './MediaPost';
import PostComments from '../Comments/PostComments'

    const GetPostType = (type, state) => {
        
        if (type == "link"){return(<LinkedPost state = {state} ></LinkedPost>)}
        else if (type === "text"){return (<TextPost state = {state}></TextPost>)}
        else if(type === "media"){return(<MediaPost state = {state}></MediaPost>)}
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
                    <div id="PostHeader" style={{ width: '70%', backgroundColor: 'white'}}>
                        <div>
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
    var postID = document.getElementById('dataHolder').getAttribute('postID');
    
    ReactDOM.render(<Post/>, document.getElementById('PostContainer'));
}
 
export default Post ;