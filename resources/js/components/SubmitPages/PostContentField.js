import React, { Component } from 'react';

export default class PostContentField extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }

  render(){
        if (this.props.highlighted == "text") {
            return (<input id = 'postTextField' type="text" 
            onChange = { (e) => this.props.updateContentValue('text', e.currentTarget.value)} 
            name="postBody"placeholder='Text(optional)'></input>)
        }
        else if(this.props.highlighted == "media")
            return(<input placeholder='Enter image url...' onChange={(e) => this.props.setUrl(e.target.value)}></input>)
        else if (this.props.highlighted == "link"){
            return(
                <div>
                    <input id = 'postLinkField' type="text" 
                    onChange = { (e) => this.props.updateContentValue('link', e.currentTarget.value)} 
                    name="postURL" placeholder='URL'></input>
                </div>
            )
        }
    }
}
