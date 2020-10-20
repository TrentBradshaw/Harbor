import { toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchIcon from '@material-ui/icons/Search';


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
      console.log('user' + this.props.user);
   // {console.log('data ' + this.props.data)}
  //  var data = JSON.parse(this.props.data);
   // console.log(data);
   //// {console.log(data[Object.keys(data)])}
   // {console.log(data[Object.keys(data)[0]])}
  //  {console.log('data2 ' +  data[Object.keys(data)[0]])}
    //{data[Object.keys(data)[0]].username}
    //ree
    
        return (
            <div style={{display: "inline-flex", width: '100%'}}>
                <div>
                    <h1>ROLLER</h1>
                </div>
                
                <div className="header__search">
                    <input type='text' className='header__searchInput'></input>
                    <SearchIcon className="header__searchIcon" />
                </div>
                
                <nav id='StatementContainer' className="container" className="vertical-menu" style={{backgroundColor: "lightblue"}}>
                    <a className = "NavItem" href='/Home'>Home</a>
                    <a className = "NavItem" href='/Explore'>Explore</a>
                    <a className = "NavItem" href='/Notifications'>Notifications</a>
                    <a className = "NavItem" href={'/' + currentUser}>Profile</a>
                    <a className = "NavItem" href='/Settings'>Settings</a>
                </nav>
            </div>
            
            /*
            <h1>Username: {data[Object.keys(data)[0]].username}</h1>
            <img src={data[Object.keys(data)[0]].pfp_url} width={200}/> 
            <h1>Description: {data[Object.keys(data)[0]].description}</h1>
            <h1>Followers: {data[Object.keys(data)[0]].followers_count}</h1>
            <h1>Following: {data[Object.keys(data)[0]].followed_count} </h1>
            <h1>Statements: {data[Object.keys(data)[0]].statements_count}</h1>
            <h1>Topics: {data[Object.keys(data)[0]].topics_count} </h1>
            */
            
        );
    }   
}  

if (document.getElementById('Header')) {
   var data = document.getElementById('dataHolder').getAttribute('data');
   var currentUser = document.getElementById('dataHolder').getAttribute('user')
   ReactDOM.render(<Profile user={currentUser} data={data}/>, document.getElementById('Header'));
}