import { divide, toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Statement from './Statement';
import UserCard from './UserCard';
import UserPageFeed from './UserPageFeed';
//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function UserPage (props){
 
       var pageOwnerInfo = JSON.parse(props.pageOwnerInfo)
       console.log(pageOwnerInfo.statements_count)
       console.log(pageOwnerInfo.docks_count)
        return (
            <div>
                <UserCard currentUser={currentUser} pageOwnerInfo={pageOwnerInfo}></UserCard>
                <UserPageFeed pageOwnerId={pageOwnerInfo.id}></UserPageFeed>
            </div>
            
        ) 
} 
    
if (document.getElementById('UserPageContainer')) {
   var pageOwnerInfo = document.getElementById('dataHolder').getAttribute('pageOwnerInfo');
   var currentUser = document.getElementById('dataHolder').getAttribute('currentUser')
   ReactDOM.render(<UserPage currentUser={currentUser} pageOwnerInfo={pageOwnerInfo} />, document.getElementById('UserPageContainer'));
}