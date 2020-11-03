import React from "react";

const liCls = "menuItem" // later on edit this class with styling
const ProfileDropDownCard = ({ data = [], setOpen }) => (
  <div>
    <ul>
      {data.map((item, i) => (
        <li key={i} className={liCls} onClick={() => setOpen(false)}>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default ProfileDropDownCard;
