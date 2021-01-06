import { divide, toArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import UserCard from './UserCard';
import Feed from './Feed';
import Loading from '../Utility/Loading';
//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function UserPage ({currentUserId, pageOwnerUsername}){
    const [profileOwnerInfo, setProfileOwnerInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [feedArray, setFeedArray] = useState();
    useEffect(() => {

        console.log(pageOwnerUsername)





//TIME TO GRAB THE FEED FROM HERE AND THEN PASS IT INTO FEED AS THE NEW ARRAY OF CONTENT



        let url = new URL('http://localhost:80/api/feed')
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
                setFeedArray(data['feed'])
                
                //if array of activity, show, else don't and load other return statement
            });
        });





        url = new URL('http://localhost:80/api/profile')
        param = {query: pageOwnerUsername}

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
                    <UserCard currentUserId = {currentUserId} profileOwnerInfo={profileOwnerInfo}></UserCard>
                    <Feed home={false} userId= {currentUserId} profileOwnerId={profileOwnerInfo.id} feedArray={feedArray}></Feed>
                </div>
            ) 
        }
} 
    
if (document.getElementById('UserPageContainer')) {
   ReactDOM.render(<UserPage 
   currentUserId={document.getElementById('dataHolder').getAttribute('currentUserId')}
   pageOwnerUsername={document.getElementById('dataHolder').getAttribute('pageOwnerUsername')}
   />, document.getElementById('UserPageContainer'));
}