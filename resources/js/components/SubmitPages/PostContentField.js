import React, { Component } from 'react';

export default class PostContentField extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }

  render(){
      {/*id = 'postTextField' */}
        if (this.props.highlighted == "text") {
            return (
            <input className = 'mediumInput'
            type="text" 
            onChange = { (e) => 
            this.props.updateContentValue('text', e.currentTarget.value)} 
            name="postBody"
            placeholder='Text(optional)'></input>)
        }
        else if(this.props.highlighted == "media")
            return(<input  className = 'thinInput'
            style={{
                        width: '90%',
                        marginLeft: '5%',
                        marginRight: '5%'
                    }}
             placeholder='Enter image url...' onChange={(e) => this.props.setUrl(e.target.value)}></input>)
        else if (this.props.highlighted == "link"){
            return(
                <div>
                    <input 
                    style={{
                        width: '90%',
                        marginLeft: '5%',
                        marginRight: '5%'
                    }}
                    id = 'postLinkField' type="text" 
                    onChange = { (e) => this.props.updateContentValue('link', e.currentTarget.value)} 
                    name="postURL" placeholder='URL'></input>
                </div>
            )
        }
    }
}
