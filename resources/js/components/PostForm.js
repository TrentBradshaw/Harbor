import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import PostSpecificationButtons from './PostSpecificationButtons'


class PostForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            highlighted: 'post'
        }
    }
    
    render() {
        return (
            <div>
                <div>
                    <input type="text" placeholder={this.props.highlighted}></input>
                </div>
                <div>
                    <input type="text" placeholder="Title" id="title"></input>
                </div>
                <div>
                    <input type="text" name="body" placeholder='Text(optional)' id="body"></input>
                </div>
            </div>
            
            

        )
    }
}

export default PostForm