import { divide, toArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import HomeInput from './HomeInput'
import Loading from '../Utility/Loading'
import Feed from '../UserPage/Feed';
//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function Home ({userId}){
    const [profileOwnerInfo, setProfileOwnerInfo] = useState([]);
    const [statusArray, changeStatusArray] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        let token = document.getElementById('csrf-token').getAttribute('content')
        let param, url
        
            url = new URL('http://localhost:80/api/feed/home')
            param = {query: userId}
        
        url.search = new URLSearchParams(param).toString();
        console.log(url)
        fetch(url, {headers:{'X-CSRF-TOKEN': token, 'Content-Type':'application/json', "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true },
            method: 'get',
            mode: "same-origin",
            credentials: "same-origin",
        }).then((response) => {
            console.log('response ' + response);
            response.json().then((data) => {
                console.log(data);
                setLoading(false)
                changeStatusArray(data['statuses'])
            });
        });
    },[]);

    function appendNewStatus(statusObject){
        console.log(JSON.stringify(statusObject) + ' sss')
        let tempStatusArray = [...statusArray]; 
        tempStatusArray.unshift(statusObject)
        console.log(tempStatusArray)
        changeStatusArray(tempStatusArray)
        console.log(statusArray)
    }
    function deleteStatus(id){
        let token = document.getElementById('csrf-token').getAttribute('content')
        fetch('/api/status/delete', {
            headers:{'X-CSRF-TOKEN': token, 'Content-Type':'application/json',},
            method: 'delete',
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({id: id})
        }).then(
            data => { 
                console.log('data from commentinput----------------------' + JSON.stringify(data))
                let tempStatusArray = [...statusArray]; 
                let index;
                for (let i = 0; i < tempStatusArray.length; i++) {
                    if(tempStatusArray[i]['id'] === id){
                    index = i
                    console.log('index: ' + index)
                    }
                }
                tempStatusArray.splice(index,1)
                console.log(tempStatusArray)
                changeStatusArray(tempStatusArray)
            }
        )
    }

        
    return (
        <div>
            <HomeInput currentUserId = {userId} profileOwnerInfo={profileOwnerInfo} appendNewStatus={appendNewStatus}></HomeInput>
            <Feed home={true} userId={userId} pageOwnerId={null} appendNewStatus={appendNewStatus} deleteStatus={deleteStatus} statusArray={statusArray}></Feed>
        </div>
    )

} 
    
if (document.getElementById('HomeContainer')) {
   ReactDOM.render(<Home 
   userId={document.getElementById('dataHolder').getAttribute('userId')}
   pageOwnerUsername={document.getElementById('dataHolder').getAttribute('pageOwnerUsername')}
   />, document.getElementById('HomeContainer'));
}