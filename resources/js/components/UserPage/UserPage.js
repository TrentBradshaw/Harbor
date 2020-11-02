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
    }
 
    render(){
       var pageOwnerInfo = JSON.parse(this.props.pageOwnerInfo)

        if (window.location.href == 'http://127.0.0.1:8000/home'){
            return (
                <div>
                    <div>
                        <div>
                            <div style={{background: 'ghostwhite'}}>
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
                </div>
            );
        }
        else {
            return (
                <div>
                    <div>
                        <div>
                            <div style={{background: 'ghostwhite'}}>
                                <div role="button" id="backButton">Back</div>
                                
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
                </div>
            );
        }
        
    }   
} 
    
if (document.getElementById('UserPageContainer')) {
   var pageOwnerInfo = document.getElementById('dataHolder').getAttribute('pageOwnerInfo');
   var currentUser = document.getElementById('dataHolder').getAttribute('user')
   ReactDOM.render(<UserPage currentUser={currentUser} pageOwnerInfo={pageOwnerInfo} />, document.getElementById('UserPageContainer'));
}