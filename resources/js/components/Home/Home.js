import { divide, toArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import HomeInput from './HomeInput'
import Loading from '../Utility/Loading'
import Feed from '../UserPage/Feed';
import Usercard from '../UserPage/UserCard'
//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function Home ({currentUserId}){
    const [profileOwnerInfo, setProfileOwnerInfo] = useState([]);
    const [feedArray, changeFeedArray] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [pfpUrl, setPfpUrl] = useState();
    
    useEffect(() => {
        let param, url
        fetch('http://localhost:80/api/userdetails', {
        headers:{'X-CSRF-TOKEN': document.getElementById('csrf-token').getAttribute('content'), 'Content-Type':'application/json',},
        method: 'get',
        mode: "same-origin",
        credentials: "same-origin",
        }).then((response) => {
            console.log(response)
            response.json().then((data) => {
                setPfpUrl(data['pfpUrl'])
                url = new URL('http://localhost:80/api/profile')
                param = {query: data['username']}
                url.search = new URLSearchParams(param).toString();
                
                fetch(url, {
                    headers:{'Content-Type':'application/json',},
                    method: 'get',
                    mode: "same-origin",
                    credentials: "same-origin",
                }).then((response) => {
                    console.log('response ' + response);
                    response.json().then((data) => {
                        console.log(data);
                        console.log('CLOWNSHOE');
                        setProfileOwnerInfo(data['profileOwnerInfo']);
                        
                        //if array of activity, show, else don't and load other return statement
                    });
                });
                
            });
        })
       
        fetch('http://localhost:80/api/feed/home', 
        {headers:{'X-CSRF-TOKEN': document.getElementById('csrf-token').getAttribute('content'), 'Content-Type':'application/json', "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true },
            method: 'get',
            mode: "same-origin",
            credentials: "same-origin",
        }).then((response) => {
            console.log('response ' + response);
            response.json().then((data) => {
                console.log(data['username'] + ' username')
                changeFeedArray(data['statuses'])
            });
        });
        
        setLoading(false);
    },[]);

    function appendNewStatus(statusObject){
        console.log(JSON.stringify(statusObject) + ' sss')
        let tempFeedArray = [...feedArray]; 
        tempFeedArray.unshift(statusObject)
        console.log(tempFeedArray)
        changeFeedArray(tempFeedArray)
        console.log(feedArray)
    }
    function deleteStatus(id){
        let token = document.getElementById('csrf-token').getAttribute('content')
        fetch('/api/statuses/delete', {
            headers:{'X-CSRF-TOKEN': token, 'Content-Type':'application/json',},
            method: 'delete',
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({statusId: id})
        }).then(
            data => { 
                console.log('data from commentinput----------------------' + JSON.stringify(data))
                let tempFeedArray = [...feedArray]; 
                let index;
                for (let i = 0; i < tempFeedArray.length; i++) {
                    if(tempFeedArray[i]['id'] === id){
                    index = i
                    console.log('index: ' + index)
                    }
                }
                tempFeedArray.splice(index,1)
                console.log(tempFeedArray)
                changeFeedArray(tempFeedArray)
            }
        )
    }

    if(isLoading)
        return(<div></div>)
    return (
        
        <div id = 'home' style= {{display:'flex', flexDirection: 'column'}} className={['baseMainContainer',].join(" ")}>
                {
                    /* <div className={['headerText', 'divHeader'].join(" ")}>
                    <h1 className='headerText' >Home</h1>
                </div>*/
                }
                
                <Usercard currentUserId={currentUserId} profileOwnerInfo={profileOwnerInfo}></Usercard>
                { /*pfpUrl && <img style={{height: '64px', width:'64px', objectFit: 'cover', alignSelf: 'center'}} src={pfpUrl}></img>*/}
                {/*<HomeInput currentUserId = {userId} profileOwnerInfo={profileOwnerInfo} appendNewStatus={appendNewStatus}></HomeInput>*/}
            <Feed home={true} currentUserId={currentUserId} pageOwnerId={null} appendNewStatus={appendNewStatus} deleteStatus={deleteStatus} feedArray={feedArray}></Feed>
        </div>
    )
    return (
        <div>
            <div style= {{display:'flex', flexDirection: 'column'}}>
                { pfpUrl && <img style={{height: '64px', width:'64px', objectFit: 'cover', alignSelf: 'center'}} src={pfpUrl}></img>}
                <HomeInput currentUserId = {userId} profileOwnerInfo={profileOwnerInfo} appendNewStatus={appendNewStatus}></HomeInput>
            </div>
            
            <Feed home={true} userId={userId} pageOwnerId={null} appendNewStatus={appendNewStatus} deleteStatus={deleteStatus} feedArray={feedArray}></Feed>
        </div>
    )

} 
export default Home;

/*
if (document.getElementById('HomeContainer')) {
   ReactDOM.render(<Home 
   userId={document.getElementById('dataHolder').getAttribute('userId')}
   pageOwnerUsername={document.getElementById('dataHolder').getAttribute('pageOwnerUsername')}
   />, document.getElementById('HomeContainer'));
}
*/