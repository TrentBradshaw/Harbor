import React from "react";

const cls = "edit this later";

const DockDropDownButton = ({ onClick }) => (
  <button style={{    height: '100%', width: '100%'}} className={cls} onClick={onClick}>
    Add username
  </button>
);

export default DockDropDownButton;
