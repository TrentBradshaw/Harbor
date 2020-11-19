import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import PostContentField from './PostContentField' 
import AutoCompleteDockLookup from '../AutoComplete/AutoCompleteDockLookup'

class PostSubmitForm extends Component {
    constructor(props){
        super(props);

        this.state = {
                highlighted: 'text',
                title:'',
                creator:'',
                timeCreated:'',
                body:'',
                media_url:'',
                url:'',
            
        }
        this.updateContentText = this.updateContentText.bind(this)
    }
    updateContentText(content, value) {
        if (content == 'text'){
            this.setState({body: value})   
        }
        else if (content == 'media'){
            this.setState({media_url: value})
        }
        else if (content == 'link'){
            this.setState({url: value})
        }

    }

    changePostType = (type) => {
        if (type == "text"){ 
            this.setState({ highlighted: 'text', media_url: '', url: ''})
        }
        else if (type == "media"){
            this.setState({ highlighted: 'media', body: '', url: ''})
        }
        else{this.setState({highlighted: 'link', body: '', media_url: ''})}
    }
    
    render() {
        return (
            <form action="/api/post/submit" method="POST" style={{width: "700px", marginLeft: '30%'}}>
                <h1>Create a Post</h1>
                <div>
                    <AutoCompleteDockLookup type='text' placeholder='Choose a destination for this post'></AutoCompleteDockLookup>
                    <input id = "dockPostTitle" type='text' placeholder='title' name='title' onChange = { (e) => {this.state.title = e.target.value}}></input>
                </div>
                <div>
                    <button type="button" onClick={ () => {this.changePostType('text')}}>Text</button>
                    <button type="button" onClick={ () => {this.changePostType('media')}}>Media</button>
                    <button type="button" onClick={ () => {this.changePostType('link')}}>Link</button>
                </div>
                    <PostContentField updateContentText = {this.updateContentText} changeContent={this.changeContent} highlighted = {this.state.highlighted}></PostContentField>
                <div>
                    <div>
                        <button type="button" onClick={()=>{this.submit()}}>SUBMIT</button>
                    </div>
                </div>
            </form>
        )
    }

    submit(){
        var postSpecificInfo;
        switch (this.state.highlighted) {
            case 'text':
                postSpecificInfo = this.state.body;
                break;
            case 'media':
                postSpecificInfo = this.state.media_url;
                break;
            case 'link':
                postSpecificInfo = this.state.url;
            default:
                break;
        }
        console.log(this.state)
        let token = document.getElementById('csrf-token').getAttribute('content')
        console.log('pickles');
        fetch('http://127.0.0.1:8000/userdetails', {
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
                    fetch('http://127.0.0.1:8000/api/posts/submit', {
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
                                media_url: this.state.media_url,
                                url: this.state.url
                        })
                    }).then(response => response.json())
                    .then(data => {/*window.location = data.redirect;*/ console.log(data)})
                        });
                    })
        
    }
}
if (document.getElementById('PostFormHolder')) {
   
    ReactDOM.render(<PostSubmitForm/>, document.getElementById('PostFormHolder'));
}