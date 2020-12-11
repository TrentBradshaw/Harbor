
import React, { useState } from 'react';

//don't forget to pass the votes into the voting system component

function CommentInput(props) {
   
        const [text, updateText] = useState('')

        return (
            <div>
                <div style={{ marginLeft: '5%', marginRight: '11%', minHeight: '100%' }}>
                    <input onChange = { e => updateText(e.target.value)} type="text"></input>
                    <button onClick = { () => submit(props, text)}>Save</button>
                </div>
            </div>
        );
    }

    function submit(props, text){
        var parentCommentId = 0
        var nestLevel = 0
        var isReply = 0
        if(props.isReply){
            nestLevel = props.comment.nest_level ++
            parentCommentId = props.comment.id
            isReply = props.comment.isReply
        }else {
            parentCommentId = 0
            nestLevel = 0
        }
        
        var token = document.getElementById('csrf-token').getAttribute('content')
        fetch('/api/comments/submit', {
            headers:{'X-CSRF-TOKEN': token, 'Content-Type':'application/json',},
            method: 'post',
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({
                creator_id: props.userId,
                parentPostId: props.parentPostId,
                parentCommentId: parentCommentId,
                body: text,
                nestLevel: nestLevel
            })
        }).then(response => response.json(console.log(response))).then(
        data => { 
            console.log('data from commentinput---------------------- REEEEEEEEEEEEEEEEEEEEEEEE' + JSON.stringify(data))
            if (props.comment && props.isReply)
                props.appendNewComment(data['comment'], isReply, parentCommentId)
            else
                props.appendNewComment(data['comment'], false, 0)
        })    
    }

export default CommentInput;