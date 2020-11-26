import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FileUpload from './FileUpload'
import MediaUploadField from './MediaUploadField'

export default class PostContentField extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }

  render(){
        if (this.props.highlighted == "text") {
            return (<input id = 'postTextField' type="text" 
            onChange = { (e) => this.props.updateContentText('text', e.currentTarget.value)} 
            name="postBody"placeholder='Text(optional)'></input>)
        }
        
        else if(this.props.highlighted == "media")
            return(<MediaUploadField updateImage =  {this.props.updateImage}></MediaUploadField>)
        
        else if (this.props.highlighted == "link"){
            return(
                <div>
                    <input id = 'postLinkField' type="text" 
                    onChange = { (e) => this.props.updateContentText('link', e.currentTarget.value)} 
                    name="postURL" placeholder='URL'></input>
                </div>
            )
        }
    }
}
