import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import PostContentField from './PostContentField' 
import AutoCompleteDockLookup from '../AutoComplete/AutoCompleteDockLookup'

function PostSubmitForm(){
    const [highlighted, setHighlighted] = useState('text');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [body, setBody] = useState('');

        return (
            <div className = 'headerSubmitForm'>
                <h1>Create a Post</h1>
                <div>
                    <AutoCompleteDockLookup></AutoCompleteDockLookup>
                    <input className="submitFormInput" id = "dockPostTitle" type='text' placeholder='title' name='title' onChange = { (e) => {setTitle(e.target.value)}}></input>
                </div>
                <div>
                    <button type="button" onClick={ () => {changePostType('text')}}>Text</button>
                    <button type="button" onClick={ () => {changePostType('media')}}>Media</button>
                    <button type="button" onClick={ () => {changePostType('link')}}>Link</button>
                </div>
                    <PostContentField setUrl = {setUrl} updateContentValue = {updateContentValue} highlighted = {highlighted}></PostContentField>
                <div>
                        <button type="button" onClick={()=>{submit()}}>SUBMIT</button>
                </div>
            </div>
        )
    
    function changePostType(type){
        setHighlighted(type);
        setUrl('');
    }

    function updateContentValue(content, value) {
        if (content == 'text')
            setBody(value) 
        else if (content == 'media')
            setUrl(value)
        else if (content == 'link')
            setUrl(value)
    }

    function submit(){ 
        fetch('/api/posts/submit', {
            headers:{'X-CSRF-TOKEN': document.getElementById('csrf-token').getAttribute('content'),'Content-Type':'application/json'},
            method: 'post',
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({
                    community: document.getElementById("dockInput").value,
                    type: highlighted,
                    title: title,
                    text: body,
                    url: url,
            })
        }).then(response => response.json(console.log(response)))
        .then(data => {
            console.log(JSON.stringify(data['post']))
            console.log(data['data'])
            //window.location.replace(data['url'])
        })           
    }
}

export default PostSubmitForm