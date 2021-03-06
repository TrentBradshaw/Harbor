import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import UserCard from './UserCard';
import Feed from './Feed';
import Loading from '../Utility/Loading';
// SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function UserPage({ currentUserId }) {
    // currentUserId, pageOwnerUsername
    const [profileOwnerInfo, setProfileOwnerInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [feedArray, setFeedArray] = useState();
    // const [currentUserId, setCurrentUserId] = useState();

    const { username } = useParams();

    useEffect(() => {
        let url = new URL('http://localhost/api/feed');
        let param = { query: username };
        url.search = new URLSearchParams(param).toString();

        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'get',
            mode: 'same-origin',
            credentials: 'same-origin',
        }).then((response) => {
            console.log(`response ${response}`);
            response.json().then((data) => {
                console.log(data);
                setFeedArray(data.feed);

                // if array of activity, show, else don't and load other return statement
            });
        });

        url = new URL('http://localhost/api/profile');
        param = { query: username };

        url.search = new URLSearchParams(param).toString();

        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'get',
            mode: 'same-origin',
            credentials: 'same-origin',
        }).then((response) => {
            console.log(`response ${response}`);
            response.json().then((data) => {
                console.log(data);
                setProfileOwnerInfo(data.profileOwnerInfo);
                setLoading(false);
                // if array of activity, show, else don't and load other return statement
            });
        });
    }, []);
    // return(<div>memes</div>)
    if (loading) {
        return <Loading />;
    }

    return (
        <div
            className={['bordered', 'baseMainContainer', 'divBackground'].join(
                ' '
            )}
        >
            <UserCard
                currentUserId={currentUserId}
                profileOwnerInfo={profileOwnerInfo}
            />
            <Feed
                home={false}
                currentUserId={currentUserId}
                profileOwnerId={profileOwnerInfo.id}
                feedArray={feedArray}
            />
        </div>
    );
}

if (document.getElementById('UserPageContainer')) {
    ReactDOM.render(
        <UserPage
        // currentUserId={document.getElementById('dataHolder').getAttribute('currentUserId')}
        // pageOwnerUsername={document.getElementById('dataHolder').getAttribute('pageOwnerUsername')}
        />,
        document.getElementById('UserPageContainer')
    );
}
export default UserPage;
