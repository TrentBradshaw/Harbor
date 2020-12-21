import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import PostContentField from './PostContentField' 
import AutoCompleteDockLookup from '../AutoComplete/AutoCompleteDockLookup'

function PostSubmitForm(props){
    const [highlighted, setHighlighted] = useState('text');
    const [title, setTitle] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [url, setUrl] = useState('');
    const [file, setFile] = useState('');
    const [body, setBody] = useState('');

        return (
            <div style={{backgroundColor: 'gainsboro', marginTop: '5%'}}>
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
                    <PostContentField updateImage = {updateImage} updateContentValue = {updateContentValue} highlighted = {highlighted}></PostContentField>
                <div>
                        <button type="button" onClick={()=>{this.submit()}}>SUBMIT</button>
                </div>
            </div>
        )
    
    function changePostType(type){
        setHighlighted(type);
        setMediaUrl('');
        setUrl('');
    }

    function updateContentValue(content, value) {
        if (content == 'text')
            setBody(value) 
        else if (content == 'media')
            setFile(value)
        else if (content == 'link')
            setUrl(value)
    }
    function updateImage(file){
        setFile(file)
    }

    function submit(){ 
        

        //FIX PNG UPLOADING ERROR?
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
                    fetch('/api/posts/submit', {
                        headers:{
                            'X-CSRF-TOKEN': token,
                            'Content-Type':'application/json',
                        },
                        method: 'post',
                        mode: "same-origin",
                        credentials: "same-origin",
                        body: JSON.stringify({
                                community: document.getElementById("dockInput").value,
                                type: this.state.highlighted,
                                title: this.state.title,
                                creatorID: data['id'],
                                text: this.state.body,
                                file: this.state.file,
                                url: this.state.url,
                                imageFile: document.getElementById('postFileField').files[0],
                                ree: 'pickles'
                        })
                    }).then(response => response.json(
                        console.log(response)
                    ))
                    .then(
                        data => {window.location.replace(data['url'])
                    })
                        });
                        
                    })
    }
}


// switch it so this is implemented without reactDOM.render
if (document.getElementById('PostFormHolder')) {
   
    ReactDOM.render(<PostSubmitForm/>, document.getElementById('PostFormHolder'));
}
export default PostSubmitForm