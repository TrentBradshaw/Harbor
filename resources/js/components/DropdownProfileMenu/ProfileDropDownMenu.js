import React from "react";
import ReactDOM from "react-dom";
import ProfileButtonWithDropDown from "./ProfileButtonDropDownCmp";

function DropdownMenu({currentUserUsername}) {
  return <ProfileButtonWithDropDown currentUserUsername={currentUserUsername}/>;
}

export default DropdownMenu
