import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class MyExample extends Component {
  constructor(props){
      super(props);
      console.log('data from component');
  }
  render() {
      return (
          <div className="container">
            .....
          </div>
      );
  }
}  

if (document.getElementById('myexample')) {
   var data = document.getElementById('myexample').getAttribute('data');
   ReactDOM.render(<MyExample data={data} />, document.getElementById('myexample'));
}
