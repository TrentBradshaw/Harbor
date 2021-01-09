//following
//followers
//followed docks
import React, { useEffect, useState } from 'react';
import react from 'react'


function Subscriptions(){
    const [feed, setFeed] = useState();
    useEffect(() => {
        loadFeed('following');
    }, []);
    function loadFeed(type){
        let url, param
        if(type=='following'){
            url = new URL('http://localhost:80/api/getFollowing')
            
        }
        else if(type==='followers'){
            url = new URL('http://localhost:80/api/api/getFollowers')
        }
        else if (type=='docks'){
            url = new URL('http://localhost:80/api/getDockSubscriptions')
        }

        fetch(url, {
            headers:{
                'X-CSRF-TOKEN': document.getElementById('csrf-token').getAttribute('content'),
                'Content-Type':'application/json',
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : true 
            },
            method: 'get',
            mode: "cors",
            credentials: "same-origin",
            }).then((response) => {
                response.json().then((data) => {
                    setFeed(data['feed']);
                });
            })
    }
    return(
        <div>
            <button onClick = {()=> loadFeed('following')}>Following</button>
            <button onClick = {()=> loadFeed('followers')}>Followers</button>
            <button onClick = {()=> loadFeed('docks')}>Docks</button>
        </div>
        
        
    )
}
export default Subscriptions;