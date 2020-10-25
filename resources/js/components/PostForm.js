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
                <input type="text" placeholder={this.props.highlighted}></input>
            </div>
            

        )
    }
}

export default PostForm