import { divide, toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Statement from './Statement';

export default class Profile extends Component {
  constructor(props){
      super(props);
      console.log(props);
      var data = JSON.parse(this.props.data);
      console.log(data);
      //const userInfo = Object.entries(data['userInfo'])
      console.log(data['userInfo'].username);
      console.log( 'username ' + data[Object.keys(data)[1]].username)
    }
 
    render(){
        var data=JSON.parse(this.props.data)
        var userInfo = data['userInfo']
        
        console.log(userInfo)
        return (
            <div>
                <div>
                    <div>
                        <div style={{background: 'ghostwhite'}}>
                            <div role="button">Back</div>
                            <span>{userInfo.username}</span>
                            <p>{parseInt(userInfo.statements_count) + parseInt(userInfo.topics_count)} contributions</p>
                        </div>
                        <div>
                            <img src={userInfo.pfp_url} alt="" id="header"></img>
                        </div>
                        <div>
                            <img src={userInfo.pfp_url} alt="" id="pfp"></img>
                        </div>
                        <div>
                            <button>follow</button>
                        </div>
                        <div>
                            <p>bio: {userInfo.description}</p>
                        </div>
                        <div>
                            <p>when joined</p>
                        </div>
                        <div>
                            <p>
                                {userInfo.followed_count} Following {userInfo.followers_count} Followers
                            </p>
                        </div>
                    </div>
                </div>
                {/* 
                <div>
                    <h1>Username: {data[Object.keys(data)[1]].username}</h1>
                    <img src={data[Object.keys(data)[0]].pfp_url} width={200}/> 
                    <h1>Description: {data[Object.keys(data)[0]].description}</h1>
                    <h1>Followers: {data[Object.keys(data)[0]].followers_count}</h1>
                    <h1>Following: {data[Object.keys(data)[0]].followed_count} </h1>
                    <h1>Statements: {data[Object.keys(data)[0]].statements_count}</h1>
                    <h1>Topics: {data[Object.keys(data)[0]].topics_count} </h1>
                </div>

                */}
                
            </div>
        );
    }   
}  

if (document.getElementById('UserPageContainer')) {
   var data = document.getElementById('dataHolder').getAttribute('data');
   var currentUser = document.getElementById('dataHolder').getAttribute('user')
   ReactDOM.render(<Profile user={currentUser} data={data}/>, document.getElementById('UserPageContainer'));
}