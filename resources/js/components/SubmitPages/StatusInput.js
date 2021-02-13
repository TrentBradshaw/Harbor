import React, { useState } from 'react';
// SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function StatusInput({ appendNewStatus, isReply, parentStatusId }) {
    const [text, setText] = useState('');

    function submit(value, isReplyTemp, parentStatusIdTemp) {
        // FIX PNG UPLOADING ERROR?
        const token = document
            .getElementById('csrf-token')
            .getAttribute('content');
        fetch('/api/statuses/submit', {
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
            method: 'post',
            mode: 'same-origin',
            credentials: 'same-origin',
            body: JSON.stringify({
                body: value,
                isReply: isReplyTemp,
                parentStatusId: parentStatusIdTemp,
            }),
        })
            .then((response) => response.json(console.log(response)))
            .then((data) => {
                console.log(data);
                appendNewStatus(data.status, true, parentStatusIdTemp);
            });
    }
    return (
        <div
            className="headerSubmitForm"
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            <input
                onChange={(e) => setText(e.target.value)}
                style={{
                    height: '100px',
                    width: '80%',
                    marginLeft: '10%',
                    marginRight: '10%',
                    fontSize: '20px',
                    marginTop: '20px',
                }}
                placeholder="tell people what's going on..."
            />
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <button
                    type="button"
                    onClick={() => submit(text, isReply, parentStatusId)}
                    style={{ height: '30px', width: '100px' }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default StatusInput;
