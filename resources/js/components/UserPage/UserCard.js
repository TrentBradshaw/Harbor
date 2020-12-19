
import React, { Component } from 'react';
import FollowButton from './FollowButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ProfileImage from './ProfileImage'
//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function UserCard({currentUserId, profileOwnerInfo}) {
    console.log(currentUserId)
    console.log(profileOwnerInfo)
    let home = (window.location.href === 'http://localhost/home')
    let username = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    
        return (
            <div>
                <div style={{background: 'ghostwhite', display: 'flex'}}>
                    <div id = 'backButtonHolder' style={{flex: '1'}}>
                        { !home && <KeyboardBackspaceIcon style={{height: '100%'}} role="button" id="backButton" />}
                    </div>
                    
                    <div style={{flex: '8', alignItems: 'stretch', display: 'flex', flexDirection: 'column'}}>
                        <span style= {{textAlign: 'left'}}>{profileOwnerInfo.username}</span>
                        <span style= {{textAlign: 'left'}}>{profileOwnerInfo.docks_count + profileOwnerInfo.statements_count} contributions</span>
                    </div>
                </div>
                <div>
                    <ProfileImage type= {'header'} url={profileOwnerInfo.header_img_url} ></ProfileImage>
                    <ProfileImage type={'profilePicture'} url = {profileOwnerInfo.pfp_url}></ProfileImage>
                    { !home && < FollowButton currentUser={currentUser} followee={profileOwnerInfo.username}></FollowButton>}
                </div>
                <div>
                    <p>bio: {profileOwnerInfo.description}</p>
                    <p>when joined</p>
                    <p> {profileOwnerInfo.followed_count} Following {profileOwnerInfo.followers_count} Followers </p>
                </div> 
            </div>
        );
    
} 
    
export default UserCard