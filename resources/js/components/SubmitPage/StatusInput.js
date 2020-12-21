
import React, { useState } from 'react';
import ImageIcon from '@material-ui/icons/Image';
import PostSubmitForm from '../SubmitPage/PostSubmitForm'

//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function StatusInput({currentUserId}) {

    const [text, setText] = useState('');
    return(
        <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'gainsboro'}}>
            <input onChange = {(e) => setText(e.target.value)} style = {{    height: '100px', width: '80%', marginLeft: '10%', marginRight: '10%'}} placeholder="Text"></input>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
                <ImageIcon style={{fontSize: '40px'}}></ImageIcon>
                <button onClick = {(e) => submit(text, currentUserId)} style={{height: '30px', width: '100px'}}>Send</button>
            </div>
        </div>
    )

    function submit(value, userId){ 
       
        //FIX PNG UPLOADING ERROR?
       let token = document.getElementById('csrf-token').getAttribute('content')
        fetch('/api/statuses/submit', {
            headers:{'X-CSRF-TOKEN': token, 'Content-Type':'application/json',},
            method: 'post',
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({
                    userId: userId,
                    body: value
            })
        }).then(response => response.json(
            console.log(response)
        ))
        .then(
            data => {console.log(data)
        })
    }
} 
    
export default StatusInput