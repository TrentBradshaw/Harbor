import React, { useState, useEffect } from 'react';

function ProfileImage({type, url}) {
    console.log('dabbie')
    if (type === 'profilePicture'){
        return(
            <img src={url} alt="" id="pfp" className="overlayedImage"></img>
        )
    }
    else if (type === 'header'){
        return (
            <img src={url} alt="" id="header" className="ImageLayedOver"></img>
        );
    }
   
}
export default ProfileImage;