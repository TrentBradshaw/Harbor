import { divide, toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Statement from './Statement';

//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
export default class UserPageFeed extends Component {
    
    
    //pass page owner in
    render(){
        console.log(this.props.pageOwnerUsername)
        fetch('/api/feed/' + this.props.pageOwnerUsername, {
            headers:{
                'Content-Type':'application/json',
            },
            method: 'get',
            mode: "same-origin",
            credentials: "same-origin",
        }).then((response) => {
            console.log('response ' + response);
            response.json().then((data) => {
                console.log(data);
            });
        });
                return(
                    <div>
                        <h1>No Content to show currently. Try following some people!</h1>
                    </div>
                );
    
         // }
    }   
}  

if (document.getElementById('content')) {
   var feedInfo = document.getElementById('dataHolder').getAttribute('feedInfo');
   var currentUser = document.getElementById('dataHolder').getAttribute('user')
   //ReactDOM.render(<UserPageFeed pageOwnerUsername={pageOwnerUsername}/>, document.getElementById('content'));
    //user={currentUser} 
}