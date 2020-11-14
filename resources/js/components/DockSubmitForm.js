import { divide, toArray } from 'lodash';
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
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
   }
 
   handleNameChange(event){ 
       this.setState({name: event.target.value})
   }
   handleDescriptionChange(event){ 
        this.setState({description: event.target.value})
    }
    handleClick(event){
        let token = document.getElementById('csrf-token').getAttribute('content')
        console.log('pickles');
        event.preventDefault();
        fetch('http://127.0.0.1:8000/dock/submit', {
        headers:{
            'X-CSRF-TOKEN': token,
            'Content-Type':'application/json',
        },
        method: 'post',
        mode: "same-origin",
        credentials: "same-origin",
        body: JSON.stringify({
                dockTitle: this.state.name,
                dockDescription: this.state.description,
        })
        }).then((response) => {
            console.log(response);
            response.json().then((data) => {
                console.log(data);
                console.log(data['dock_added'])
                if (data['dock_added']){
                    window.location.href = 'http://127.0.0.1:8000/dock/' + data['dock_url_title'];
                }
            });

            
        })
    }
  
    render(){
        
        return(
        <div style={{paddingTop: '32px'}}>
            <h2>Create a Dock</h2>
            <hr></hr>
            <h2>Name of Dock</h2>
            <input value= {this.state.name} onChange={this.handleNameChange}></input>
            <h2>Description</h2>
            <input value= {this.state.description} onChange={this.handleDescriptionChange}></input>
            <button onClick={(e) => this.handleClick(e)}>Create Dock</button>
        </div>
        )
    }
}  

if (document.getElementById('CreateDockFormHolder')) {
   ReactDOM.render(<DockSubmitForm/>, document.getElementById('CreateDockFormHolder')); //figure out what this data will be
}