import { divide, toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Statement from './Statement';
import FollowButton from './FollowButton';
//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
class UserCard extends Component {
  constructor(props){
      super(props);
      //var data = JSON.parse(this.props.pageOwnerInfo);
      console.log('props from usercard' + JSON.stringify(props));
      //console.log('pageOwnerInfo' + JSON.stringify(data));
    }
 
    render(){
       var pageOwnerInfo = JSON.stringify(this.props.pageOwnerInfo)
       console.log(pageOwnerInfo.statements_count)
       console.log(pageOwnerInfo.docks_count)
       if (document.getElementById('UserPageContainer')) {
        var pageOwnerInfo = this.props.pageOwnerInfo;
        var currentUser = this.props.currentUser;
        console.log('PAGE OWNER INFO:::' + JSON.stringify(pageOwnerInfo))
        //var currentUser = this.props.currentUser;
       }
        if (window.location.href == 'http://127.0.0.1:8000/home'){
            return (
                <div>
                    <div>
                        <div>
                            <div style={{background: 'ghostwhite'}}>
                                <span>{pageOwnerInfo.username}</span>
                                <p>{pageOwnerInfo.docks_count + pageOwnerInfo.statements_count} contributions</p>
                            </div>
                            <div>
                                <img src={pageOwnerInfo.pfp_url} alt="" id="header" className="ImageLayedOver"></img>
                            </div>
                            <div>
                                <img src={pageOwnerInfo.pfp_url} alt="" id="pfp" className="overlayedImage"></img>
                            </div>
                            <div>
                                
                            </div>
                            <div>
                                <p>bio: {pageOwnerInfo.description}</p>
                            </div>
                            <div>
                                <p>when joined</p>
                            </div>
                            <div>
                                <p>
                                    {pageOwnerInfo.followed_count} Following {pageOwnerInfo.followers_count} Followers
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div>
                        <div>
                            <div style={{background: 'ghostwhite'}}>
                                <div role="button" id="backButton">Back</div>
                                
                                <span>{pageOwnerInfo.username}</span>
                                <p>{pageOwnerInfo.docks_count + pageOwnerInfo.statements_count} contributions</p>
                            </div>
                            <div>
                                <img src={pageOwnerInfo.pfp_url} alt="" id="header" className="ImageLayedOver"></img>
                            </div>
                            <div>
                                <img src={pageOwnerInfo.pfp_url} alt="" id="pfp" className="overlayedImage"></img>
                            </div>
                            <div>
                                <FollowButton currentUser={currentUser} followee={pageOwnerInfo.username}></FollowButton>
                            </div>
                            <div>
                                <p>bio: {pageOwnerInfo.description}</p>
                            </div>
                            <div>
                                <p>when joined</p>
                            </div>
                            <div>
                                <p>
                                    {pageOwnerInfo.followed_count} Following {pageOwnerInfo.followers_count} Followers
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
    }   
} 
    
export default UserCard