import React from "react";

const cls = "edit this later";

function PopulateUserDropDownCard(){
    let token = document.getElementById('csrf-token').getAttribute('content')
        console.log('pickles');
        fetch('http://127.0.0.1:8000/userdetails', {
        headers:{
            'X-CSRF-TOKEN': token,
            'Content-Type':'application/json',
        },
        method: 'post',
        mode: "same-origin",
        credentials: "same-origin",
        }).then((response) => {
            response.json().then((data) => {
                console.log(data['username']);
                return data['username'];
            });
        })
}
const ProfileDropDownButton = ({ onClick }) => (
  <button style={{    height: '100%' ,width: '100%'}} className={cls} onClick={onClick}>
    {PopulateUserDropDownCard()}  
  </button>
);

/* fix this later by turning this into a class, making a variable that calls PopulatUserDropDownCard and then assign the button text to the variable
/* {{document.getElementById('dataHolder').getAttribute('currentUser')}} */
export default ProfileDropDownButton;
