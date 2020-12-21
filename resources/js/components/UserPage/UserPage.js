import { divide, toArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Statement from './Statement';
import UserCard from './UserCard';
import Feed from './Feed';
import Loading from '../Utility/Loading';
//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function UserPage ({userId, pageOwnerUsername}){
    const [profileOwnerInfo, setProfileOwnerInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let url = new URL('http://localhost:80/api/profile')
        let param = {query: pageOwnerUsername}

        url.search = new URLSearchParams(param).toString();
        
        fetch(url, {
            headers:{
                'Content-Type':'application/json',
            },
            method: 'get',
            mode: "same-origin",
            credentials: "same-origin",
        }).then((response) => {
            console.log('response ' + response);
            response.json().then((data) => {
                console.log(data);
                setProfileOwnerInfo(data['profileOwnerInfo']);
                setLoading(false);
                //if array of activity, show, else don't and load other return statement
            });
        });
            
      }, []);
        //return(<div>memes</div>)
        if (loading){
            return(<Loading></Loading>)
        }
        else {
            return (
            
                <div>
                    <UserCard currentUserId = {userId} profileOwnerInfo={profileOwnerInfo}></UserCard>
                    <Feed currentUserId = {userId} profileOwnerId={profileOwnerInfo.id}></Feed>
                </div>
            ) 
        }
        
       
} 
    
if (document.getElementById('UserPageContainer')) {
   ReactDOM.render(<UserPage 
   userId={document.getElementById('dataHolder').getAttribute('userId')}
   pageOwnerUsername={document.getElementById('dataHolder').getAttribute('pageOwnerUsername')}
   />, document.getElementById('UserPageContainer'));
}