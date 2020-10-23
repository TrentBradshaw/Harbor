import { divide, toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Statement from './Statement';
//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
export default class UserPage extends Component {
  constructor(props){
      super(props);
      var data = JSON.parse(this.props.pageOwnerInfo);
      console.log(data);
      //const userInfo = Object.entries(data['userInfo'])
      //console.log(data['userInfo'].username);
      //console.log( 'username ' + data[Object.keys(data)[1]].username)
    }
 
    render(){
       // var data=JSON.parse(this.props.userInfo)
       // var userInfo = data['userInfo']
       var pageOwnerInfo = JSON.parse(this.props.pageOwnerInfo)
       console.log()
        //console.log(userInfo)
        return (
            <div>
                <div>
                    <div>
                        <div style={{background: 'ghostwhite'}}>
                            <div role="button">Back</div>
                            <span>{pageOwnerInfo.username}</span>
                            <p>{parseInt(pageOwnerInfo.statements_count) + parseInt(pageOwnerInfo.topics_count)} contributions</p>
                        </div>
                        <div>
                            <img src={pageOwnerInfo.pfp_url} alt="" id="header" className="ImageLayedOver"></img>
                        </div>
                        <div>
                            <img src={pageOwnerInfo.pfp_url} alt="" id="pfp" className="overlayedImage"></img>
                        </div>
                        <div>
                            <button>follow</button>
                        </div>
                        <div>
                            <p>bio: {pageOwnerInfo.description}</p>
                        </div>
                        <div>
                            <p>when joined</p>
                        </div>
                        <div>
                            <p>
                                {pageOwnerInfo.followed_count} Following {pageOwnerInfo.followers_count} Followers
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
   var pageOwnerInfo = document.getElementById('dataHolder').getAttribute('pageOwnerInfo');
   var currentUser = document.getElementById('dataHolder').getAttribute('user')
   ReactDOM.render(<UserPage currentUser={currentUser} pageOwnerInfo={pageOwnerInfo} />, document.getElementById('UserPageContainer'));
}