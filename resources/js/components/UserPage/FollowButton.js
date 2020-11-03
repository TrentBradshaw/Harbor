import { divide, toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Statement from './Statement';

class FollowButton extends Component {
    
    constructor(props){ super(props);}
    
    render(){
        return(
            <button  onClick={()=>{this.submit()}} >follow</button>
        )
    }
    submit(){
       
        console.log(this.state)
        fetch('http://127.0.0.1:8000/api/followers', {
            headers:{
                'Content-Type':'application/json',
            },
            method: 'post',
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({
                    following: this.props.currentUser,
                    followee: this.props.followee,
            })
            //JSON.stringify({
              //  obj : this.state;
                //mainInfo: this.state.mainInfo, 
                //specialInfo: postSpecificInfo
            //})
            
        }).then((response) => {
            console.log(response);
            response.json().then((data) => {
                console.log(data);
            });
        })
    }  
}  

export default FollowButton