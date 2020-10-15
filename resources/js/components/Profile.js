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
    console.log(data);
    {console.log(data[Object.keys(data)])}
    {console.log(data[Object.keys(data)[0]])}
    {console.log('data2 ' +  data[Object.keys(data)[0]])}
    
    return (
       
        <div id='StatementContainer' className="container" style={{backgroundColor: "lightblue"}}>
          <h1>Username: {data[Object.keys(data)[0]].username}</h1>
          <img src={data[Object.keys(data)[0]].pfp_url} width={200}/> 
          <h1>Description: {data[Object.keys(data)[0]].description}</h1>
          <h1>Followers: {data[Object.keys(data)[0]].followers_count}</h1>
          <h1>Following: {data[Object.keys(data)[0]].followed_count} </h1>
          <h1>Statements: {data[Object.keys(data)[0]].statements_count}</h1>
          <h1>Topics: {data[Object.keys(data)[0]].topics_count} </h1>
        </div>
    );
}
}  

if (document.getElementById('profile')) {
   var data = document.getElementById('dataHolder').getAttribute('data');
   ReactDOM.render(<Profile data={data}/>, document.getElementById('profile'));
}