import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Home from './Home/Home';
import StatusContainer from './Status/StatusContainer';
import Header from './Header/Header';
import UserPage from './UserPage/UserPage';
import DockContainer from './DockPage/DockContainer';
import Subscriptions from './Subscriptions';
import Post from './Posts/Post';
import NotificationContainer from './Notification Page/NotificationContainer';

// ADD A TRENDING PAGE USING A NEWS SITE API

function App() {
    const [userInfo, setUserInfo] = useState('MEME');
    useEffect(() => {
        fetch('https://harborsms.herokuapp.com/api/userdetails', {
            headers: {
                'X-CSRF-TOKEN': document
                    .getElementById('csrf-token')
                    .getAttribute('content'),
                'Content-Type': 'application/json',
            },
            method: 'get',
            mode: 'same-origin',
            credentials: 'same-origin',
        }).then((response) => {
            console.log(response);
            response.json().then((data) => {
                setUserInfo(data);
            });
        });
    }, []);
    return (
        <Router>
            <div className="App" />
            <Route path="/" component={Header} />

            <Switch>
                <Route
                    path="/home"
                    render={() => <Home currentUserId={userInfo.id} />}
                />
                <Route path="/subscriptions" render={() => <Subscriptions />} />
                <Route
                    path="/notifications"
                    component={NotificationContainer}
                />
                <Route
                    path="/user/:username/status/:statusId"
                    render={() => (
                        <StatusContainer currentUserId={userInfo.id} />
                    )}
                />
                <Route
                    exact
                    path="/dock/:dockname/post/:postId/:postTitle"
                    render={() => <Post currentUserId={userInfo.id} />}
                />
                <Route
                    exact
                    path="/dock/:dockname"
                    render={() => <DockContainer currentUserId={userInfo.id} />}
                />

                <Route
                    exact
                    path="/user/:username"
                    render={() => <UserPage currentUserId={userInfo.id} />}
                />
            </Switch>
            {/* <Route path="/" component={Trending}/> */}
        </Router>
    );
}
if (document.getElementById('react-root')) {
    ReactDOM.render(<App />, document.getElementById('react-root'));
}
export default App;
