
import React, { Component } from 'react';
import FollowButton from './FollowButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ProfileImage from './ProfileImage'
//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function UserCard({currentUser, pageOwnerInfo}) {
    let home = (window.location.href === 'http://localhost/home')
    
        return (
            <div>
                <div style={{background: 'ghostwhite', display: 'flex'}}>
                
                    <div id = 'backButtonHolder' style={{flex: '1'}}>
                        { !home && <KeyboardBackspaceIcon style={{height: '100%'}} role="button" id="backButton" />}
                    </div>
                    
                    <div style={{flex: '8', alignItems: 'stretch', display: 'flex', flexDirection: 'column'}}>
                        <span style= {{textAlign: 'left'}}>{pageOwnerInfo.username}</span>
                        <span style= {{textAlign: 'left'}}>{pageOwnerInfo.docks_count + pageOwnerInfo.statements_count} contributions</span>
                    </div>
                </div>
                <div>
                    <ProfileImage type= {'header'} url={pageOwnerInfo.header_img_url} ></ProfileImage>
                    <ProfileImage type={'profilePicture'} url = {pageOwnerInfo.pfp_url}></ProfileImage>
                    { !home && < FollowButton currentUser={currentUser} followee={pageOwnerInfo.username}></FollowButton>}
                </div>
                <div>
                    <p>bio: {pageOwnerInfo.description}</p>
                    <p>when joined</p>
                    <p> {pageOwnerInfo.followed_count} Following {pageOwnerInfo.followers_count} Followers </p>
                </div> 
            </div>
        );
    
} 
    
export default UserCard