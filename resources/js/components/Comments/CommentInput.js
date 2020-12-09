
import React, { useState, useEffect } from 'react';

//don't forget to pass the votes into the voting system component
function submit(props, text, appendNewComment){
    console.log('propsssssssssss from commentinput ' + JSON.stringify(props))
    
    console.log(' props from commentinput submit'+ props.comment)
    if(props.isReply){
        console.log('Nl ' + props.comment.nest_level)
        console.log(props.comment.nest_level += 1)
        var nestLevel = props.comment.nest_level ++
    }else {
        nestLevel = 0
    }
    console.log(nestLevel + ' outside of if')
    // if (state.isReply){} handle REPLY COMMENTS HERE
    let token = document.getElementById('csrf-token').getAttribute('content')
       
                    fetch('/api/comments/submit', {
                        headers:{
                            'X-CSRF-TOKEN': token,
                            'Content-Type':'application/json',
                        },
                        method: 'post',
                        mode: "same-origin",
                        credentials: "same-origin",
                        body: JSON.stringify({
                                creator_id: this.props.userId,
                                parentPostId: props.parentPostId,
                                parentCommentId: props.comment.id,
                                body: text,
                                nestLevel: nestLevel
                        })
                    }).then(response => response.json(
                        console.log(response)
                    ))
                    .then(
                        data => { 
                            console.log('data from commentinput----------------------' + JSON.stringify(data))
                            appendNewComment(data['comment'], props.isReply, props.comment.id)
                        })
                        
                        
                    
}


function CommentInput(props) {

    
    const [currentText, updateText] = useState('')
   
    if (props.isReply){
        console.log('dabbie')
        console.log('props' + JSON.stringify(props))
        console.log('propsComment' + props.comment)
    }

    return (
        <div>
            <div style={{ marginLeft: '5%', marginRight: '11%', minHeight: '100%' }}>
                <input onChange = { e => updateText(e.currentTarget.value)} type="text"></input>
                <button onClick = { () => submit(props, currentText, props.appendNewComment)}>Save</button>
            </div>
        </div>
        

    );
}

export default CommentInput;