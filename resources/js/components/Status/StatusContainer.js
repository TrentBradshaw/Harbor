import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import Status from './Status';

// SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function StatusContainer({ currentUserId }) {
    const [isLoading, setLoading] = useState(true);
    const [repliesArray, setRepliesArray] = useState();
    const [mainStatus, setMainStatus] = useState();

    const { statusId } = useParams();
    useEffect(() => {
        const url = new URL('http://localhost:80/api/statuses');
        const param = { query: statusId };
        url.search = new URLSearchParams(param).toString();
        fetch(url, {
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
                setRepliesArray(data.replies);
                setMainStatus(data.status);
                setLoading(false);
            });
        });
    }, []);
    function appendNewStatus(commentObject, isReply, parentStatusId) {
        const tempCommentsArray = [...repliesArray];
        let index;
        if (isReply) {
            for (let i = 0; i < tempCommentsArray.length; i += 1) {
                if (tempCommentsArray[i].id === parentStatusId) {
                    console.log(`i: ${i}`);
                    index = i + 1;
                    console.log(`index: ${index}`);
                }
            }
            tempCommentsArray.splice(index, 0, commentObject);
            console.log(tempCommentsArray);
            setRepliesArray(tempCommentsArray);
        } else {
            tempCommentsArray.unshift(commentObject);
            console.log(tempCommentsArray);
            setRepliesArray(tempCommentsArray);
        }
    }
    function deleteStatus(id) {
        // if the comment is deleted and a parrent then just update the properties to say deleted comment
        const token = document
            .getElementById('csrf-token')
            .getAttribute('content');
        // ADD THE FETCH
        fetch('/api/comments/delete', {
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
            method: 'put',
            mode: 'same-origin',
            credentials: 'same-origin',
            body: JSON.stringify({ id: id }),
        }).then((data) => {
            console.log(
                `data from commentinput----------------------${JSON.stringify(
                    data
                )}`
            );
        });
    }
    if (!isLoading) {
        return (
            <div id="statusShowcase" className="baseMainContainer">
                <h1 className="divHeader">
                    <span>Status</span>
                </h1>
                <Status
                    appendNewStatus={appendNewStatus}
                    deleteStatus={deleteStatus}
                    status={mainStatus}
                    currentUserId={mainStatus.user_id}
                    form="focus"
                />
                {repliesArray.map((element) => (
                    <Status
                        key={element.id}
                        currentUserId={currentUserId}
                        deleteStatus={deleteStatus}
                        appendNewStatus={appendNewStatus}
                        status={element}
                        form="feed"
                    />
                ))}
            </div>
        );
    }

    return <div>meme</div>;
}

if (document.getElementById('statusContainer')) {
    const statusId = document
        .getElementById('dataHolder')
        .getAttribute('statusId');
    ReactDOM.render(
        <StatusContainer statusId={statusId} />,
        document.getElementById('statusContainer')
    ); // figure out what this data will be
}
export default StatusContainer;
