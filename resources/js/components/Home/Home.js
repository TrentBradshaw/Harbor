import { divide, toArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import HomeInput from './HomeInput'
import Loading from '../Utility/Loading'
import Feed from '../UserPage/Feed';
//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function Home ({userId}){
    const [profileOwnerInfo, setProfileOwnerInfo] = useState([]);
    const [statusArray, setStatusArray] = useState([]);

     
        
    return (
        <div>
            <HomeInput currentUserId = {userId} profileOwnerInfo={profileOwnerInfo}></HomeInput>
            <Feed home={true} userId={userId} pageOwnerId={null} appendNewStatus={appendNewStatus} deleteStatus={deleteStatus}></Feed>
        </div>
    )
} 
    
if (document.getElementById('HomeContainer')) {
   ReactDOM.render(<Home 
   userId={document.getElementById('dataHolder').getAttribute('userId')}
   pageOwnerUsername={document.getElementById('dataHolder').getAttribute('pageOwnerUsername')}
   />, document.getElementById('HomeContainer'));
}