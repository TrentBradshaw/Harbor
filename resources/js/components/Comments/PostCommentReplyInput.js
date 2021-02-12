import React, { useState } from 'react';

// don't forget to pass the votes into the voting system component
function submit(props, text, appendNewComment) {
    const token = document.getElementById('csrf-token').getAttribute('content');
    fetch('/userdetails', {
        headers: {
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json',
        },
        method: 'post',
        mode: 'same-origin',
        credentials: 'same-origin',
    }).then((response) => {
        response.json().then((data) => {
            fetch('/api/comments/submit', {
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
                method: 'post',
                mode: 'same-origin',
                credentials: 'same-origin',
                body: JSON.stringify({
                    creator_id: data.id,
                    parentCommentId: props.parentCommentId,
                    body: text,
                }),
            }).then((secondResponse) => {
                secondResponse
                    .json(console.log(secondResponse))
                    .then((secondData) => {
                        appendNewComment(secondData);
                    });
            });
        });
    });
}

// add a callback function that sends the new comment to the PostComments

function CommentInput({ parentPostId, appendNewComment }) {
    const [currentText, updateText] = useState('');
    const [state] = useState({
        isReply: false,
        parentCommentId: '',
        parentPostId: parentPostId,
    });
    return (
        <div>
            <div
                style={{
                    marginLeft: '2%',
                    marginRight: '2%',
                    minHeight: '100%',
                }}
            >
                <input
                    onChange={(e) => updateText(e.currentTarget.value)}
                    type="text"
                />
                <button
                    type="button"
                    onClick={() => submit(state, currentText, appendNewComment)}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
export default CommentInput;
