import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import PostContentField from './PostContentField' 
import AutoCompleteDockLookup from '../AutoComplete/AutoCompleteDockLookup'
import LinkIcon from '@material-ui/icons/Link';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined';

function PostSubmitForm(){
    const [highlighted, setHighlighted] = useState('text');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [body, setBody] = useState('');

        return (
            <div style={{backgroundColor: 'white'}} className = 'headerSubmitForm'>
                <h1 style={{backgroundColor: '#5c8bc4', color: 'white', borderRadius:  '5px 5px 0px 0px', marginBottom: '40px'}} >Create a Post</h1>
                <div>
                    <AutoCompleteDockLookup></AutoCompleteDockLookup>
                    <textarea className={['thinInput', 'textArea'].join(" ")} id = "dockPostTitle" type='text' maxlength = "50" placeholder='title' name='title' onChange = { (e) => {setTitle(e.target.value)}}></textarea>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button 
                        style={{display:'flex', flexDirection:'row',
                        alignItems: 'center', justifyContent: 'center'}}                         
                        className = 'popUpSubmitButton' 
                        type="button" 
                        onClick={ () => {changePostType('text')}}>
                        <TextFieldsOutlinedIcon></TextFieldsOutlinedIcon>
                        Text
                    </button>
                    <button
                        style={{display:'flex', flexDirection:'row',
                        alignItems: 'center', justifyContent: 'center'}} 
                        className = 'popUpSubmitButton' 
                        type="button" onClick={ () => {changePostType('media')}}>
                        <LinkIcon></LinkIcon>
                        Media
                    </button>
                    <button
                        style={{display:'flex', flexDirection:'row',
                        alignItems: 'center', justifyContent: 'center'}} 
                        className = 'popUpSubmitButton'  
                        type="button" onClick={ () => {changePostType('link')}}>
                        <ImageOutlinedIcon></ImageOutlinedIcon>
                        Link
                    </button>
                </div>
                    <PostContentField setUrl = {setUrl} updateContentValue = {updateContentValue} highlighted = {highlighted}></PostContentField>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                        <button className = 'submitButton' type="button" onClick={()=>{submit()}}>SUBMIT</button>
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