import React from "react";

const cls = "edit this later";

const Button = ({ onClick }) => (
  <button className={cls} onClick={onClick}>
    Add username
  </button>
);

export default Button;
