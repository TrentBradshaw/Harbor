import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import PostSpecificationButtons from './PostSpecificationButtons'
import PostForm from './PostForm'

class CreatePost extends Component {
    constructor(props){
        super(props);

        this.state = {
            highlighted: 'post'
        }
    }
    forceUpdateHandler(){
        this.forceUpdate();
    };
    changePostType = (type) => {
        if (type == "text"){
            this.state.highlighted = "text"
            this.forceUpdateHandler();
        }else if (type == "media"){
            this.state.highlighted = "text"
            this.forceUpdateHandler();
        }
        else{
            this.state.highlighted = "link"
            this.forceUpdateHandler();
        }
        console.log(this.state.highlighted)
    }
    
    render() {
        return (
            <div>
                <div>
                    <PostSpecificationButtons changePostType = {this.changePostType} forceUpdateHandler={this.forceUpdateHandler}></PostSpecificationButtons>
                </div>
                <div>
                    <PostForm highlighted ={this.state.highlighted}></PostForm>
                </div>
            </div>
            

        )
    }
}
if (document.getElementById('CreatePostHolder')) {
   
    ReactDOM.render(<CreatePost/>, document.getElementById('CreatePostHolder'));
}
