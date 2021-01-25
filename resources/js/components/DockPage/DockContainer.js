import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import FollowButton from '../UserPage/FollowButton';

//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function DockContainer() {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    let { dockname } = useParams()
    
    useEffect(() => {
        console.log('docktime')
        console.log('pickles');
        console.log(window.location.pathname)
        console.log('http://localhost:80/api/' + dockname)
        fetch( 'http://localhost:80/api/' + dockname, {
        headers:{
            'X-CSRF-TOKEN': document.getElementById('csrf-token').getAttribute('content'),
            'Content-Type':'application/json',
        },
        method: 'GET',
        mode: "same-origin",
        credentials: "same-origin",
        }).then((response) => {
            console.log(response)
            response.json().then((data) => {
                //get the dock name by grabbing the window.location.pathname or href then trimming off the first part
                console.log(data);
            });
        })
        
    }, []);
   

   function HandleClick(){
    window.location.href = '/post/submit'

       
   }
        
        return(
            <div style= {{ height: '100%'}} className={['leftBorder', 'rightBorder', 'baseMainContainer'].join(" ")}>
                <div style={{backgroundColor : 'red', height: '200px'}}></div>
                <div  style= {{ display: 'flex', height: '100%'}}>
                    <div style= {{backgroundColor: 'grey', Height: '100%', width: '650px', height: '100%', marginLeft: '20%'}} id="mainContent">
                        <div id="dockHeader">
                            <div style={{display: 'flex'}}>
                                <img id="dockImg" style= {{ Height: '64px', width: '64px'}}
                                src='https://tr2.cbsistatic.com/hub/i/r/2017/03/23/9cf93159-d002-4d3b-b100-c0a49a4a3189/resize/1200x/84a084ba7643f0a5d638ebe002ef82f9/dockernewhero.jpg'>

                                </img>
                                <h1 id="dockTitle">Clowns</h1>
                                <FollowButton targetName = {dockname} type={'dock'}></FollowButton>
                            </div>
                            <h3 id="dockPath">dock/Clowns</h3>
                        </div>
                    </div>
                    <div style= {{backgroundColor: 'blue', Height: '100%', width: '300px', height: '100%'}} id="sidebarInfo">
                        <h2>About this Dock</h2>
                        <div>
                            <p>Description about this dock</p>
                            <div>
                                <p>100</p>
                                <p>Members</p>
                            </div>
                            <p>Created mmm/dd/yyyy</p>
                            <button onClick={(e) => HandleClick(e)}>Create Post</button>
                        </div>
                        <div>
                        <h2>Moderators</h2>
                            <p>ClownCreator</p>
                        </div>

                    </div>
                </div>
            </div>
            
        )
    
}  

export default DockContainer;