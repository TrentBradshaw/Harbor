import React from "react";

const liCls = "menuItem" // later on edit this class with styling
function CombinedFunctions(item){
    
    //setOpen(false)
    window.location.href = "/dock/" + item;

}
const DockDropDownCard = ({ data = [], setOpen }) => (
  <div>
    <ul>
        <li onClick ={()=> window.location.href = "/dock/create"}>Create Dock</li>
      {data.map((item, i) => (
        <li key={i} className={liCls} onClick={() => CombinedFunctions(item)}>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default DockDropDownCard;
