import React, { useState, useEffect } from 'react';
import NotificationObject from './NotificationObject';

// SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function NotificationContainer() {
    const [isLoading, setLoading] = useState(true);
    const [notificationsArray, setNotificationsArray] = useState();

    useEffect(() => {
        fetch('http://localhost:80/api/notifications', {
            headers: {
                'X-CSRF-TOKEN': document
                    .getElementById('csrf-token')
                    .getAttribute('content'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            method: 'get',
            mode: 'cors',
            credentials: 'same-origin',
        }).then((response) => {
            response.json().then((data) => {
                console.log(data);
                setNotificationsArray(data.notifications);
                setLoading(false);
            });
        });
    }, []);

    if (isLoading) {
        return <div>meme</div>;
    }

    return (
        <div
            id="notificationContainer"
            className={['bordered', 'baseMainContainer'].join(' ')}
        >
            <h1 className="divHeader">
                <span>Notifications</span>
            </h1>
            {notificationsArray.map((element) => (
                <NotificationObject
                    key={element.id}
                    status={element}
                    form="feed"
                />
            ))}
        </div>
    );
}

export default NotificationContainer;
