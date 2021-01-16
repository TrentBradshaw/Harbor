//following
//followers
//followed docks
import React, { useEffect, useState } from 'react';
import react from 'react'
import SubscriptionObject from '../components/UserPage/SubscriptionObject'


function Subscriptions(){
    const [feedArray, setFeed] = useState([]);
    const [isLoading, setLoading] = useState();
    useEffect(() => {
        loadFeed('following');
    }, []);
    function loadFeed(type){
        let url, param
        if(type=='following'){
            url = new URL('http://localhost:80/api/getFollowing')
            
        }
        else if(type==='followers'){
            url = new URL('http://localhost:80/api/getFollowers')
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
                    console.log(data)
                    setFeed(data['feed']);
                    setLoading(false);
                });
            })
    }
    if (isLoading)
        return(<div></div>)
    return(
        <div className={['leftBorder', 'rightBorder', 'baseMainContainer'].join(" ")}>
            <div style = {{    display: 'flex',
    justifyContent: 'space-evenly'}} className='divHeader'>
                <button className = 'headerText2' style= {{outline: 'none', backgroundColor: 'transparent', border:'none', fontSize: '30px'}} onClick = {()=> loadFeed('following')}><span >Following</span></button>
                <button className = 'headerText2' style= {{outline: 'none', backgroundColor: 'transparent', border:'none', fontSize: '30px'}} onClick = {()=> loadFeed('followers')}><span >Followers</span></button>
                <button className = 'headerText2' style= {{outline: 'none', backgroundColor: 'transparent', border:'none', fontSize: '30px'}} onClick = {()=> loadFeed('docks')}><span >Docks</span></button>
            </div>
            <div>
            {feedArray.map((element)=>(
                        <SubscriptionObject 
                         key = {element.id} 
                        
                        
                        feedItem = {element}
                        ></SubscriptionObject>
                    ))}
            </div>
        </div>
        
        
        
    )
}
export default Subscriptions;