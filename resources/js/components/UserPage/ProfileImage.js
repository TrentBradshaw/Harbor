import React from 'react';

function ProfileImage({ type, url }) {
    console.log('dabbie');
    if (type === 'profilePicture') {
        return <img src={url} alt="" id="pfp" className="overlayedImage" />;
    }
    if (type === 'header') {
        return <img src={url} alt="" id="header" className="ImageLayedOver" />;
    }
}
export default ProfileImage;
