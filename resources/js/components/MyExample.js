import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class MyExample extends Component {
  constructor(props){
      super(props);
      console.log(props);
  }
  render(){
    return (
        <div id='StatementContainer' className="container" style={{backgroundColor: "lightblue"}}>
            <div className="row justify-content-center" style={{backgroundColor: "lightblue"}}>
                <div className="col-md-8" style={{backgroundColor: "lightblue"}}>
                    <div className="card" style={{backgroundColor: "lightblue"}}>
                        <div className="card-header">Example Component</div>

                        <div className="card-body">REEEEEE I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
}  

if (document.getElementById('myexample')) {
   var data = document.getElementById('dataHolder').getAttribute('data');
   ReactDOM.render(<MyExample data={data}/>, document.getElementById('myexample'));
}
