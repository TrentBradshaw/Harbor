import React, { Component } from 'react';
import FollowButton from './FollowButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ProfileImage from './ProfileImage'
//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function UserCard({currentUserId, profileOwnerInfo}) {
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
                        <span style= {{textAlign: 'left'}}>{profileOwnerInfo.contributionsCount} contributions</span>
                    </div>
                </div>
                <div style={{display:'flex', alignItems: 'center', flexDirection:'column'}}>
                    {/*<ProfileImage type= {'header'} url={profileOwnerInfo.headerUrl} ></ProfileImage>*/}
                    <ProfileImage type={'profilePicture'} url = {profileOwnerInfo.pfpUrl}></ProfileImage>
                    { currentUserId != profileOwnerInfo.id && <FollowButton targetName={profileOwnerInfo.username} type={'user'}></FollowButton>}
                </div>
                <div style={{marginTop : '75px', textAlign: 'start' ,marginLeft: '50px'}}>
                    <p>{profileOwnerInfo.description}</p>
                    <p>{'joined ' + profileOwnerInfo.joinedAgo}</p>
                    <p> {profileOwnerInfo.followingCount} Following {profileOwnerInfo.followersCount} Followers </p>
                </div> 
            </div>
        );
} 
    
export default UserCard