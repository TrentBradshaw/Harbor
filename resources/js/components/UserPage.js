import { divide, toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Profile extends Component {
  constructor(props){
      super(props);
      console.log(props);
      var data = JSON.parse(this.props.data);
      console.log(data);
    }
 
    render(){
        return (
            <div>
                <div>
                    <div>
                        <div>
                            <div role="button">Back</div>
                            <span>{data[Object.keys(data)[0]].username}</span>
                            <p>this many contributions</p>
                        </div>
                        <div>
                            <img src="8IYSjofV_400x400.jpg" alt="" id="header"></img>
                        </div>
                        <div>
                            <img src="8IYSjofV_400x400.jpg" alt="" id="pfp"></img>
                        </div>
                        <div>
                            <button>follow</button>
                        </div>
                        <div>
                            <p>bio</p>
                        </div>
                        <div>
                            <p>when joined</p>
                        </div>
                        <div>
                            <p>
                                0 Following 0 Followers
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Username: {data[Object.keys(data)[0]].username}</h1>
                    <img src={data[Object.keys(data)[0]].pfp_url} width={200}/> 
                    <h1>Description: {data[Object.keys(data)[0]].description}</h1>
                    <h1>Followers: {data[Object.keys(data)[0]].followers_count}</h1>
                    <h1>Following: {data[Object.keys(data)[0]].followed_count} </h1>
                    <h1>Statements: {data[Object.keys(data)[0]].statements_count}</h1>
                    <h1>Topics: {data[Object.keys(data)[0]].topics_count} </h1>
                </div>
            </div>
        );
    }   
}  

if (document.getElementById('profile')) {
   var data = document.getElementById('dataHolder').getAttribute('data');
   var currentUser = document.getElementById('dataHolder').getAttribute('user')
   ReactDOM.render(<Profile user={currentUser} data={data}/>, document.getElementById('profile'));
}