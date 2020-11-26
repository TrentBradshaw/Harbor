import React, { Component } from 'react';

export default class FileUploadComponent extends Component
{
   constructor(props) {
      super(props);
      this.state ={
        image: ''
      }
      this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
            return;
      this.createImage(files[0]);
    }
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.props.updateImage(e.target.result)
      };
      reader.readAsDataURL(file);
    }
  
   render()
   {
      return(
        <input id = 'postFileField' type="file" onChange = { (e) => this.onChange(e)} name="postFile"></input>
   
      )
   }
}