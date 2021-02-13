/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
// make this more secure by handling the following/follow more nuanced
// switch to hooks down the road
function FollowButton({ targetName, type }) {
    const [isFollowingText, setIsFollowingText] = useState('');
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    function figureOutIfFollowingOrNot() {
        console.log(`type: ${type}`);
        let url;
        if (type === 'dock')
            url = new URL('http://localhost:80/api/dockSubscriptionStatus');
        else if (type === 'user')
            url = new URL('http://localhost:80/api/followers');
        const token = document
            .getElementById('csrf-token')
            .getAttribute('content');

        const param = { query: targetName };
        url.search = new URLSearchParams(param).toString();
        fetch(url, {
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            method: 'get',
            mode: 'cors',
            credentials: 'same-origin',
        }).then((response) => {
            response.json().then((data) => {
                if (type === 'dock') setIsFollowing(data.subscribed);
                else if (type === 'user') setIsFollowing(data.following);

                if (type === 'user')
                    data.following
                        ? setIsFollowingText('Following')
                        : setIsFollowingText('Follow');
                if (type === 'dock') {
                    data.subscribed
                        ? setIsFollowingText('Joined')
                        : setIsFollowingText('Join');
                }
                setIsLoading(false);
            });
        });
    }
    useEffect(() => {
        figureOutIfFollowingOrNot();
    }, []);

    function submit() {
        let url;
        let method;

        if (type === 'dock') {
            url = new URL('http://localhost:80/api/dockSubscription');
            if (isFollowing) {
                method = 'delete';
                setIsFollowingText('Join');
                setIsFollowing(false);
            } else {
                method = 'post';
                setIsFollowingText('Joined');
                setIsFollowing(true);
            }
        } else if (type === 'user') {
            url = new URL('http://localhost:80/api/followers');
            if (isFollowing) {
                method = 'delete';
                setIsFollowingText('Follow');
                setIsFollowing(false);
            } else {
                method = 'post';
                setIsFollowingText('Following');
                setIsFollowing(true);
            }
        }

        fetch(url, {
            headers: {
                'X-CSRF-TOKEN': document
                    .getElementById('csrf-token')
                    .getAttribute('content'),
                'Content-Type': 'application/json',
            },
            method: method,
            mode: 'same-origin',
            credentials: 'same-origin',
            body: JSON.stringify({ target: targetName }),
        });
    }
    if (isLoading) {
        return <div>Loading</div>;
    }
    return (
        <button type="button" id="followBtn" onClick={() => submit()}>
            {isFollowingText}
        </button>
    );
}

export default FollowButton;
