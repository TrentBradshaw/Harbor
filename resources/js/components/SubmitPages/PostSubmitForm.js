import React, { useState } from 'react';
import LinkIcon from '@material-ui/icons/Link';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined';
import AutoCompleteDockLookup from '../AutoComplete/AutoCompleteDockLookup';
import PostContentField from './PostContentField';

function PostSubmitForm() {
    const [highlighted, setHighlighted] = useState('text');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [body, setBody] = useState('');
    function changePostType(type) {
        setHighlighted(type);
        setUrl('');
    }

    function updateContentValue(content, value) {
        if (content === 'text') setBody(value);
        else if (content === 'media') setUrl(value);
        else if (content === 'link') setUrl(value);
    }
    function submit() {
        fetch('/api/posts/submit', {
            headers: {
                'X-CSRF-TOKEN': document
                    .getElementById('csrf-token')
                    .getAttribute('content'),
                'Content-Type': 'application/json',
            },
            method: 'post',
            mode: 'same-origin',
            credentials: 'same-origin',
            body: JSON.stringify({
                community: document.getElementById('dockInput').value,
                type: highlighted,
                title: title,
                text: body,
                url: url,
            }),
        })
            .then((response) => response.json(console.log(response)))
            .then((data) => {
                console.log(JSON.stringify(data.post));
                console.log(data.data);
                // window.location.replace(data['url'])
            });
    }
    return (
        <div style={{ backgroundColor: 'white' }} className="headerSubmitForm">
            <h1
                style={{
                    backgroundColor: '#5c8bc4',
                    color: 'white',
                    borderRadius: '5px 5px 0px 0px',
                    marginBottom: '40px',
                }}
            >
                Create a Post
            </h1>
            <div>
                <AutoCompleteDockLookup />
                <textarea
                    className={['thinInput', 'textArea'].join(' ')}
                    id="dockPostTitle"
                    type="text"
                    maxLength="50"
                    placeholder="title"
                    name="title"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <button
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    className="popUpSubmitButton"
                    type="button"
                    onClick={() => {
                        changePostType('text');
                    }}
                >
                    <TextFieldsOutlinedIcon />
                    Text
                </button>
                <button
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    className="popUpSubmitButton"
                    type="button"
                    onClick={() => {
                        changePostType('media');
                    }}
                >
                    <LinkIcon />
                    Media
                </button>
                <button
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    className="popUpSubmitButton"
                    type="button"
                    onClick={() => {
                        changePostType('link');
                    }}
                >
                    <ImageOutlinedIcon />
                    Link
                </button>
            </div>
            <PostContentField
                setUrl={setUrl}
                updateContentValue={updateContentValue}
                highlighted={highlighted}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <button
                    className="submitButton"
                    type="button"
                    onClick={() => {
                        submit();
                    }}
                >
                    SUBMIT
                </button>
            </div>
        </div>
    );
}

export default PostSubmitForm;
