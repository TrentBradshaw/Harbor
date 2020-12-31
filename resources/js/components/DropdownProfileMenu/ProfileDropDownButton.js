import React from "react";

const cls = "edit this later";


const ProfileDropDownButton = ({ currentUserUsername, onClick }) => (
  <button style={{    height: '100%' ,width: '100%'}} className={cls} onClick={onClick}>
    {currentUserUsername}  
  </button>
);

export default ProfileDropDownButton;
