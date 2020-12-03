import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import React, {Component} from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

    

    
    class VotingSystem extends Component{

        constructor(props){
            super(props);
            console.log('props' + this.props)
            
    
            this.state = {
                upvoted: false,
                downvoted: false,
            }   
        }
        vote(id, upvoted, downvoted){
            let token = document.getElementById('csrf-token').getAttribute('content')
            fetch('/userdetails', {
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
                        var url = new URL('http://localhost:80/api/comments/engagement')
         
                        fetch(url, {
                            headers:{ 'X-CSRF-TOKEN': token, 'Content-Type':'application/json', "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true},
                            method: 'put',
                            mode: "cors",
                            credentials: "same-origin",
                            body: JSON.stringify({
                                userID : data['id'],
                                targetID: id,
                                upvoted: upvoted,
                                downvoted: downvoted,
                            })
                            
                            }).then((response) => {
                                response.json().then((data) => {
                                    console.log(JSON.stringify(data))
                                    console.log('commentsArray ' + data['comments'])
                                }).then(
                                    data => {
                                        console.log(data)
                                        //
    
    
                                        //here we'll switch state and color of the arrow to reflect 
                                    }
                                    )
                            })
                                })
                            })
            
        }
        
        componentDidMount(){
            let token = document.getElementById('csrf-token').getAttribute('content')
            //change this to get
            fetch('/userdetails', {
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

                        
            var url = new URL('http://localhost:80/api/comments/engagement')
            let param = {userID: data['id'], postID: this.props.id}

            url.search = new URLSearchParams(param).toString();
            fetch(url, {
                headers:{ 'X-CSRF-TOKEN': token, 'Content-Type':'application/json', "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true},
                method: 'get',
                mode: "cors",
                credentials: "same-origin",
                }).then((response) => {
                    response.json().then((data) => {
                        console.log(JSON.stringify(data))
                    }).then(
                        data => {
                            console.log(data)
                            //


                            //here we'll switch state and color of the arrow to reflect 
                        }
                        )
                
                    })
                });
                
            })
                
        }

        render(){
            return(
                <div>
                    <div style= {{height: '100px'}}>
                        <ArrowDropUpIcon style = {{fill: this.state.upvoted ? "orange" : null }} onClick = {() => {vote(props.id, true, false)}} ></ArrowDropUpIcon>
                        <p>number</p>
                        <ArrowDropDownIcon style = {{fill: this.state.downvoted ? "blue" : null }} onClick = {() => {vote(props.id, false, true)}} ></ArrowDropDownIcon>
                    </div>
                </div>
               
            )
        }
    }

export default VotingSystem;