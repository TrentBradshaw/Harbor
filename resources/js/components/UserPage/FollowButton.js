import React, { Component } from 'react';
//make this more secure by handling the following/follow more nuanced
//switch to hooks down the road
class FollowButton extends Component {
    
    constructor(props){ super(props);}
    state = {
        isFollowingText: '',
        isFollowing: '',
        stateSet: false,
    }

    figureOutIfFollowingOrNot(){
        if(this.state.isFollowingText == ''){
            this.setState({stateSet: false});
        }
        else{
            this.setState({stateSet: true});
        }

        if (!this.state.stateSet){  //if state isn't set then set it 
            var isFollowing = document.getElementById('dataHolder').getAttribute('isFollowing')
            var isFollowingText = ''
            if (isFollowing == '1'){
                isFollowingText = 'Following'
            } else{
                isFollowingText = 'Follow'
            }
            this.setState({isFollowingText: isFollowingText }) 
        }
    }
    componentDidMount(){
        this.figureOutIfFollowingOrNot();
    }

    //establish state with both fields empty.
    
    render(){
        return(
            <button  onClick={()=>{this.submit()}} >{this.state.isFollowingText}</button>
        )
    }
    submit(){
       
        if (this.state.isFollowingText == 'Follow'){
            this.setState({ isFollowingText: 'Following' });
            fetch('/api/followers', {
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
            }).then((response) => {
                console.log(response);
                response.json().then((data) => {
                    
                    this.forceUpdate();
                    console.log(data);
                });
            })
        } else if (this.state.isFollowingText == 'Following'){
            this.setState({ isFollowingText: 'Follow' });
            fetch('/api/followers/'  + this.props.followee, {
            headers:{
                'Content-Type':'application/json',
            },
            method: 'delete',
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({
                    following: this.props.currentUser,
                    followee: this.props.followee,
            })
            }).then((response) => {
                console.log(response);
                response.json().then((data) => {
                   
                    console.log(data);
                });
            })
        }
    }  
}  

export default FollowButton