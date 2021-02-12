import React, { useState } from 'react';

// don't forget to pass the votes into the voting system component

function CommentInput({
    isReply,
    parentComment,
    appendNewComment,
    parentPostId,
    hideInputChange,
}) {
    const [text, updateText] = useState('');
    function submit(
        isReplyT,
        parentCommentT,
        appendNewCommentT,
        parentPostIdT,
        textT,
        hideInputChangeT
    ) {
        let parentCommentId = 0;
        let nestLevel = 0;

        if (parentComment) {
            parentCommentId = parentComment.id;
            nestLevel = parentComment.nest_level + 1;
        }
        // console.log('props from commentinput submit ' + JSON.stringify(props))
        const token = document
            .getElementById('csrf-token')
            .getAttribute('content');
        fetch('/api/comments/submit', {
            // this is where you do it, check database for pfp url and also upvote the comment yourself

            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
            method: 'post',
            mode: 'same-origin',
            credentials: 'same-origin',
            body: JSON.stringify({
                parentPostId: parentPostId,
                parentCommentId: parentCommentId,
                body: text,
                nestLevel: nestLevel,
            }),
        })
            .then((response) => response.json(console.log(response)))
        data => { 
            if (parentComment)
                appendNewComment(data['comment'], isReply, parentComment.id)
            else
                appendNewComment(data['comment'], false, 0)
            
            if(isReply)
                hideInputChange();
        })
    }
    return (
        <div>
            <div
                style={{
                    marginLeft: '5%',
                    marginRight: '11%',
                    minHeight: '100%',
                }}
            >
                <input
                    onChange={(e) => updateText(e.target.value)}
                    type="text"
                />
                <button
                    type="button"
                    onClick={() =>
                        submit(
                            isReply,
                            parentComment,
                            appendNewComment,
                            parentPostId,
                            text,
                            hideInputChange
                        )
                    }
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default CommentInput;
