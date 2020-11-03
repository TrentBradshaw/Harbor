import React from "react";

const cls = "edit this later";

const DockDropDownButton = ({ onClick }) => (
  <button className={cls} onClick={onClick}>
    Add username
  </button>
);

export default DockDropDownButton;
