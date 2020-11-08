import { divide, toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Statement from './Statement';
import FollowButton from './FollowButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { SpaTwoTone } from '@material-ui/icons';
//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
class UserCard extends Component {
  constructor(props){
      super(props);
      console.log('props from usercard' + JSON.stringify(props));

    }
 
    render(){
       var pageOwnerInfo = JSON.stringify(this.props.pageOwnerInfo)
       console.log(pageOwnerInfo.statements_count)
       console.log(pageOwnerInfo.docks_count)
       var pageOwnerInfo = this.props.pageOwnerInfo;
        var currentUser = this.props.currentUser;
        console.log('PAGE OWNER INFO:::' + JSON.stringify(pageOwnerInfo))
        //var currentUser = this.props.currentUser;
       if (document.getElementById('UserPageContainer')) {
        
       }
        if (window.location.href == 'http://127.0.0.1:8000/home'){
            console.log(typeof pageOwnerInfo.docks_count)
            console.log(typeof pageOwnerInfo.statements_count)
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
                            <div style={{background: 'ghostwhite', display: 'flex'}}>
                                <div id = 'backButtonHolder' style={{flex: '1'}}>
                                    <KeyboardBackspaceIcon style={{height: '100%'}} role="button" id="backButton" />
                                    
                                </div>
                                <div style={{flex: '8', alignItems: 'stretch', display: 'flex', flexDirection: 'column'}}>
                                    <span style= {{textAlign: 'left'}}>{pageOwnerInfo.username}</span>
                                    <span style= {{textAlign: 'left'}}>{pageOwnerInfo.docks_count + pageOwnerInfo.statements_count} contributions</span>
                                </div>
                                
                                
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