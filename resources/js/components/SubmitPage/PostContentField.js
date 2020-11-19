import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class PostContentField extends Component {
  constructor(props){
      super(props);
      console.log(props);
    }

  render(){
    return (
        <div>
            {(() => {
                if (this.props.highlighted == 'text') {
                    return (
                        <div>
                            <input id = 'postTextField' type="text" onChange = { (e) => this.props.updateContentText('text', e.currentTarget.value)} name="postBody"placeholder='Text(optional)'></input>
                        </div>
                    )
                } else if (this.props.highlighted == 'media') {
                    return (
                        <div>
                            <input id = 'postFileField' type="file" onChange = { (e) => this.props.updateContentText('media', e.currentTarget.value)} name="postFile"></input>
                        </div>
                    )
                } else if (this.props.highlighted == 'link') {
                    return (
                        <div>
                        <input id = 'postLinkField' type="text" onChange = { (e) => this.props.updateContentText('link', e.currentTarget.value)} name="postURL" placeholder='URL'></input>
                        </div>
                    )
                }
                })()}
        </div>
    );
    }
}  

if (document.getElementById('myexample')) {
   var data = document.getElementById('dataHolder').getAttribute('data');
   ReactDOM.render(<MyExample data={data}/>, document.getElementById('myexample'));
}
