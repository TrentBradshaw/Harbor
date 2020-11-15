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
    console.log(window.location.pathname)
    console.log('http://127.0.0.1:8000/api' + window.location.pathname)
    fetch( 'http://127.0.0.1:8000/api' + window.location.pathname, {
    headers:{
        'X-CSRF-TOKEN': token,
        'Content-Type':'application/json',
    },
    method: 'GET',
    mode: "same-origin",
    credentials: "same-origin",
    }).then((response) => {
        console.log(response)
        response.json().then((data) => {
            //get the dock name by grabbing the window.location.pathname or href then trimming off the first part
            console.log(data);
        });
    })
   }
  
    render(){
        
        return(
            <div style= {{ height: '100%'}} id='DockPageContainer'>
                <div style={{backgroundColor : 'red', height: '200px'}}></div>
                <div  style= {{ display: 'flex', height: '100%'}}>
                    <div style= {{backgroundColor: 'grey', Height: '100%', width: '650px', height: '100%', marginLeft: '20%'}} id="mainContent">
                        <div id="dockHeader">
                            <div style={{display: 'flex'}}>
                                <img id="dockImg" style= {{ Height: '64px', width: '64px'}}
                                src='https://tr2.cbsistatic.com/hub/i/r/2017/03/23/9cf93159-d002-4d3b-b100-c0a49a4a3189/resize/1200x/84a084ba7643f0a5d638ebe002ef82f9/dockernewhero.jpg'>

                                </img>
                                <h1 id="dockTitle">Clowns</h1>
                                <button>JOIN</button>

                            </div>
                            <h3 id="dockPath">dock/Clowns

                            </h3>
                            


                        </div>
                    </div>
                    <div style= {{backgroundColor: 'blue', Height: '100%', width: '300px', height: '100%'}} id="sidebarInfo"></div>
                </div>
            </div>
            
        )
    }
}  

if (document.getElementById('DocksContainer')) {
   ReactDOM.render(<DockSubmitForm/>, document.getElementById('DocksContainer')); //figure out what this data will be
}