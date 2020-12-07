
import React, { useState, useEffect } from 'react';

//don't forget to pass the votes into the voting system component
function submit(props, text, appendNewComment, id){
    var comment;
    console.log(props)
    //console.log(props2)
    // if (state.isReply){} handle REPLY COMMENTS HERE
    let token = document.getElementById('csrf-token').getAttribute('content')
        fetch('/userdetails', {
            headers:{
                'X-CSRF-TOKEN': token,
                'Content-Type':'application/json',
            },
            method: 'post',
            mode: "same-origin",
            credentials: "same-origin",
            }).then((response) => {
                response.json().then((data) => {
                    console.log(data['username']);
                    fetch('/api/comments/submit', {
                        headers:{
                            'X-CSRF-TOKEN': token,
                            'Content-Type':'application/json',
                        },
                        method: 'post',
                        mode: "same-origin",
                        credentials: "same-origin",
                        body: JSON.stringify({
                                creator_id: data['id'],
                                //parentPostId: props.parentPostId,
                                parentCommentId: props.parentCommentId,
                                body: text
                        })
                    }).then(response => response.json(
                        console.log(response)
                    ))
                    .then(
                        data => { 
                            console.log(data)
                            appendNewComment(data)
                            comment = data
                            
                            
                        })
                        });
                        
                    })
                    //add a callback function that sends the new comment to the PostComments 
}


function CommentInput(props) {

    const [isLoading, setLoading] = useState(true);
    const [currentText, updateText] = useState('')
    const [state, setNewState] = useState({
        isReply: false,
        parentCommentId: '',
        parentPostId: props.parentPostId,

    });
    console.log('dabbie')
    return (
        <div>
            <div style={{ marginLeft: '2%', marginRight: '2%', minHeight: '100%'}}>
                <input onChange = { e => updateText(e.currentTarget.value)} type="text"></input>
                <button onClick = { () => submit(state, currentText, props.appendNewComment)}>Save</button>
            </div>
        </div>
        

    );
}

export default CommentInput;