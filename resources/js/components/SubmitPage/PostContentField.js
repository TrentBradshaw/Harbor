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
                        <input type="text" name="postBody"placeholder='Text(optional)'></input>
                           
                        </div>
                    
                    )
                } else if (this.props.highlighted == 'media') {
                    return (
                        <div>
                            <input type="file" name="postFile"></input>
                        </div>
                    )
                } else if (this.props.highlighted == 'link') {
                    return (
                        <div>
                        <input type="text" name="postURL" placeholder='URL'></input>
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
