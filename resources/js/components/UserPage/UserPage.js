import { divide, toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Statement from './Statement';
import UserCard from './UserCard';
import UserPageFeed from './UserPageFeed';
//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
export default class UserPage extends Component {
  constructor(props){
      super(props);
      
      //var data = JSON.parse(this.props.pageOwnerInfo);
      //console.log('props' + props);
      //console.log('pageOwnerInfo' + JSON.stringify(data));
    }
 
    render(){
       var pageOwnerInfo = JSON.parse(this.props.pageOwnerInfo)
       console.log(pageOwnerInfo.statements_count)
       console.log(pageOwnerInfo.docks_count)
       console.log()
       var contributions = (parseFloat(pageOwnerInfo.followers_count)  + parseFloat( pageOwnerInfo.followed_count) )
       console.log( contributions)

        return (
            <div>
                <UserCard currentUser={currentUser} pageOwnerInfo={pageOwnerInfo}></UserCard>
                <UserPageFeed pageOwnerUsername={pageOwnerInfo.username}></UserPageFeed>
            </div>
            
        )
    }   
} 
    
if (document.getElementById('UserPageContainer')) {
   var pageOwnerInfo = document.getElementById('dataHolder').getAttribute('pageOwnerInfo');
   var currentUser = document.getElementById('dataHolder').getAttribute('currentUser')
   ReactDOM.render(<UserPage currentUser={currentUser} pageOwnerInfo={pageOwnerInfo} />, document.getElementById('UserPageContainer'));
}