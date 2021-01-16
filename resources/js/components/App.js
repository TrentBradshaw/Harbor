import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation,
    useParams
  } from "react-router-dom";
import Home from '../components/Home/Home'
import Status from '../components/Status/Status'
import StatusContainer from '../components/Status/StatusContainer'
import ReactDOM from 'react-dom';
import Header from '../components/Header/Header'
import UserPage from '../components/UserPage/UserPage'
import DockContainer from './DockPage/DockContainer';
import Subscriptions from '../components/Subscriptions';
import Post from '../components/Posts/Post';
import Trending from '../components/Trending';








// ADD A TRENDING PAGE USING A NEWS SITE API






function App(){
    const [userInfo, setUserInfo] = useState('MEME');
    useEffect(() => {
        fetch('http://localhost:80/api/userdetails', {
        headers:{'X-CSRF-TOKEN': document.getElementById('csrf-token').getAttribute('content'),'Content-Type':'application/json',},
        method: 'get',
        mode: "same-origin",
        credentials: "same-origin",
        }).then((response) => {
            console.log(response)
            response.json().then((data) => {
                setUserInfo(data);
            });
        })
      }, []);
    return(
        <Router>
            <div className="App">
                
            </div>
                <Route path="/" component={Header}/>
                
            <Switch>
                
                <Route path="/home" render= {() => (<Home currentUserId={userInfo.id}></Home>)}/>
                <Route path="/subscriptions" render={() => (<Subscriptions></Subscriptions>)} />
                <Route path="/user/:username/status/:statusId" render= {() => (<StatusContainer currentUserId={userInfo.id}></StatusContainer>)}/>
                <Route exact path="/dock/:dockname/post/:postId/:postTitle" render ={() => (<Post currentUserId={userInfo.id}></Post>)}/>
                <Route exact path="/dock/:dockname" render ={() => (<DockContainer currentUserId={userInfo.id}></DockContainer>)}/>
                
               
                
                
                <Route exact path="/user/:username" render={() =>(<UserPage currentUserId={userInfo.id}></UserPage>)}/>
            </Switch>
           {/*<Route path="/" component={Trending}/> */} 
        </Router>
       
    )
}
if(document.getElementById('react-root')){
    ReactDOM.render(<App/>, document.getElementById('react-root'));
}
export default App;