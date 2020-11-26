import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FileUpload from './FileUpload'

export default class MediaUploadField extends Component {
  constructor(props){
      super(props);
      console.log(props);
    }

    render(){
        return (
            <div>
            //add onchange to update the form with the file
                <FileUpload updateImage = {this.props.updateImage}></FileUpload>
            </div>
        )
    }  
}