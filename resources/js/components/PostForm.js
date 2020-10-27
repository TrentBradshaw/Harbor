import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import PostSpecificationButtons from './PostSpecificationButtons'


class PostForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            highlighted: 'text',
            title:'',
            body:'',
            flairs:'',
            spoiler:'',
            nsfw:'',
            creator:'',
            timeCreated:''
        }
    }
    
    render() {
        return (
            <div>
                <div>
                    <input type="text" placeholder={this.props.highlighted}></input>
                </div>
                <div>
                    
                    <input type="text" placeholder="Title" id="title" onChange={(item)=>{this.state.title = item.target.value}}></input>
                                    
                    
                </div>
                <div>
                    <input type="text" name="body" placeholder='Text(optional)' id="body" onChange={(item)=>{this.state.body = item.target.value}}></input>
                </div>
            </div>
            
            

        )
    }
}

export default PostForm