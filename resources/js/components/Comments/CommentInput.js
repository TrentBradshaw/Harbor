
import React, { useState } from 'react';

//don't forget to pass the votes into the voting system component

    function CommentInput({isReply, userId, parentComment, appendNewComment, parentPostId, hideInputChange}) {
        const [text, updateText] = useState('')
        return (
            <div>
                <div style={{ marginLeft: '5%', marginRight: '11%', minHeight: '100%' }}>
                    <input onChange = { e => updateText(e.target.value)} type="text"></input>
                    <button onClick = { () => submit(isReply, userId, parentComment, appendNewComment, parentPostId, text, hideInputChange)}>Save</button>
                </div>
            </div>
        );
    }
    
    function submit(isReply, userId, parentComment, appendNewComment, parentPostId, text, hideInputChange){ 
        console.log(text)
        let parentCommentId = 0;
        let nestLevel = 0;

        if (parentComment){
            parentCommentId = parentComment.id
            nestLevel = parentComment.nest_level + 1
        }
           
        //console.log('props from commentinput submit ' + JSON.stringify(props))
        let token = document.getElementById('csrf-token').getAttribute('content')
        fetch('/api/comments/submit', {
            headers:{'X-CSRF-TOKEN': token, 'Content-Type':'application/json',},
            method: 'post',
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({
                creator_id: userId,
                parentPostId: parentPostId,
                parentCommentId: parentCommentId,
                body: text,
                nestLevel: nestLevel
            })
        }).then(response => response.json(console.log(response))).then(
        data => { 
            console.log('data from commentinput---------------------- REEEEEEEEEEEEEEEEEEEEEEEE' + JSON.stringify(data))
            console.log()
            if (parentComment)
                appendNewComment(data['comment'], isReply, parentComment.id)
            else
                appendNewComment(data['comment'], false, 0)
            
            if(isReply)
                hideInputChange();
        })    
    }

export default CommentInput;