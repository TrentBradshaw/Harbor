import { toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Profile extends Component {
  constructor(props){
      super(props);
      console.log(props);
      var data = JSON.parse(this.props.data);
      console.log(data);
    }
  //props should come in as

  /*
    {
        "username":"Test",
        "pfp_url":null,
        "description":null,
        "followers_count":0,
        "followed_count":0,
        "statements_count":0,
        "topics_count":"0"
    }
  */
 
  render(){
    {console.log('data ' + this.props.data)}
    var data = JSON.parse(this.props.data);
    {console.log('data ' +  data[Object.keys(data)[0]])}
    
    return (
       
        <div id='StatementContainer' className="container" style={{backgroundColor: "lightblue"}}>
          <h1>Username: {data[Object.keys(data)[0]]}</h1>
          <img src={data[Object.keys(data)[1]]} width={200}/> 
          <h1>Description: {data[Object.keys(data)[2]]}</h1>
          <h1>Followers: {data[Object.keys(data)[3]]}</h1>
          <h1>Following: {data[Object.keys(data)[4]]} </h1>
          <h1>Statements: {data[Object.keys(data)[5]]}</h1>
          <h1>Topics: {data[Object.keys(data)[6]]} </h1>
        </div>
    );
}
}  

if (document.getElementById('profile')) {
   var data = document.getElementById('dataHolder').getAttribute('data');
   ReactDOM.render(<Profile data={data}/>, document.getElementById('profile'));
}