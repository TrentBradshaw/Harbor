import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
export default class DockSubmitForm extends Component {
  constructor(props){
      super(props)
      this.state = {
          name: '',
          description: ''
      }
   }
 
   componentDidMount(){
    let token = document.getElementById('csrf-token').getAttribute('content')
    console.log('pickles');
    fetch('/127.0.0.1/api' + window.location.pathname, {
    headers:{
        'X-CSRF-TOKEN': token,
        'Content-Type':'application/json',
    },
    method: 'get',
    mode: "same-origin",
    credentials: "same-origin",
    }).then((response) => {
        response.json().then((data) => {
            //get the dock name by grabbing the window.location.pathname or href then trimming off the first part
            console.log(data['username']);
            return data['username'];
        });
    })
   }
  
    render(){
        
        return(
            <div>
            <div id="mainContainer">

            </div>
            <div id="sidebarInfo">

            </div>
            </div>
            
        )
    }
}  

if (document.getElementById('DocksContainer')) {
   ReactDOM.render(<DockSubmitForm/>, document.getElementById('DocksContainer')); //figure out what this data will be
}