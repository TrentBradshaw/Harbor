import React from "react";

const cls = "edit this later";

const ProfileDropDownButton = ({ onClick }) => (
  <button style={{    height: '100%' ,width: '100%'}} className={cls} onClick={onClick}>
    {document.getElementById('dataHolder').getAttribute('currentUser')}
  </button>
);

export default ProfileDropDownButton;
