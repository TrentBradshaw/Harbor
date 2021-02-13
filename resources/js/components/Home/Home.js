import React, { useEffect, useState } from 'react';
import Feed from '../UserPage/Feed';
import Usercard from '../UserPage/UserCard';
// SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function Home({ currentUserId }) {
    const [profileOwnerInfo, setProfileOwnerInfo] = useState([]);
    const [feedArray, changeFeedArray] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [pfpUrl, setPfpUrl] = useState();

    useEffect(() => {
        let param;
        let url;
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
                setPfpUrl(data.pfpUrl);
                url = new URL('https://harborsms.herokuapp.com/api/profile');
                param = { query: data.username };
                url.search = new URLSearchParams(param).toString();

                fetch(url, {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'get',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                }).then((secondResponse) => {
                    console.log(`response ${secondResponse}`);
                    response.json().then((secondData) => {
                        setProfileOwnerInfo(secondData.profileOwnerInfo);
                        // if array of activity, show, else don't and load other return statement
                    });
                });
            });
        });

        fetch('https://harborsms.herokuapp.com/api/feed/home', {
            headers: {
                'X-CSRF-TOKEN': document
                    .getElementById('csrf-token')
                    .getAttribute('content'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            method: 'get',
            mode: 'same-origin',
            credentials: 'same-origin',
        }).then((response) => {
            console.log(`response ${response}`);
            response.json().then((data) => {
                console.log(`${data.username} username`);
                changeFeedArray(data.statuses);
            });
        });

        setLoading(false);
    }, []);

    function appendNewStatus(statusObject) {
        console.log(`${JSON.stringify(statusObject)} sss`);
        const tempFeedArray = [...feedArray];
        tempFeedArray.unshift(statusObject);
        console.log(tempFeedArray);
        changeFeedArray(tempFeedArray);
        console.log(feedArray);
    }
    function deleteStatus(id) {
        const token = document
            .getElementById('csrf-token')
            .getAttribute('content');
        fetch('/api/statuses/delete', {
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
            method: 'delete',
            mode: 'same-origin',
            credentials: 'same-origin',
            body: JSON.stringify({ statusId: id }),
        }).then((data) => {
            console.log(
                `data from commentinput----------------------${JSON.stringify(
                    data
                )}`
            );
            const tempFeedArray = [...feedArray];
            let index;
            for (let i = 0; i < tempFeedArray.length; i += 1) {
                if (tempFeedArray[i].id === id) {
                    index = i;
                    console.log(`index: ${index}`);
                }
            }
            tempFeedArray.splice(index, 1);
            console.log(tempFeedArray);
            changeFeedArray(tempFeedArray);
        });
    }

    if (isLoading) return <div />;
    return (
        <div
            id="home"
            style={{ display: 'flex', flexDirection: 'column' }}
            className={['baseMainContainer'].join(' ')}
        >
            <Usercard
                currentUserId={currentUserId}
                profileOwnerInfo={profileOwnerInfo}
            />

            <Feed
                home
                currentUserId={currentUserId}
                pageOwnerId={null}
                appendNewStatus={appendNewStatus}
                deleteStatus={deleteStatus}
                feedArray={feedArray}
            />
        </div>
    );
}
export default Home;
