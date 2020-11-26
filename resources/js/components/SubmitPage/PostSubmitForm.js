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
                file:'',
                url:'',
        }
        this.changePostType = this.changePostType.bind(this)
        this.updateContentValue = this.updateContentValue.bind(this)
        this.updateImage = this.updateImage.bind(this)
    }
    render() {
        return (
            <form action="/api/post/submit" method="POST" style={{width: "700px", marginLeft: '30%'}}>
                <h1>Create a Post</h1>
                <div>
                    <AutoCompleteDockLookup type='text' placeholder='Choose a destination for this post'></AutoCompleteDockLookup>
                    <input id = "dockPostTitle" type='text' placeholder='title' name='title' onChange = { (e) => {this.setState({title: e.target.value})}}></input>
                </div>
                <div>
                    <button type="button" onClick={ () => {this.changePostType('text')}}>Text</button>
                    <button type="button" onClick={ () => {this.changePostType('media')}}>Media</button>
                    <button type="button" onClick={ () => {this.changePostType('link')}}>Link</button>
                </div>
                    <PostContentField updateImage = {this.updateImage} updateContentValue = {this.updateContentValue} highlighted = {this.state.highlighted}></PostContentField>
                <div>
                        <button type="button" onClick={()=>{this.submit()}}>SUBMIT</button>
                </div>
            </form>
        )
    }
    changePostType = (type) => {
        if (type == "text")
            this.setState({ highlighted: 'text', media_url: '', url: ''})
        else if (type == "media")
            this.setState({ highlighted: 'media', body: '', url: ''})
        else if (type == "link")
            this.setState({highlighted: 'link', body: '', media_url: ''})
    }

    updateContentValue(content, value) {
        if (content == 'text'){
            this.setState({body: value})   
        }
        else if (content == 'media'){
            this.setState({file: value})
        }
        else if (content == 'link'){
            this.setState({url: value})
        }
    }
    updateImage(file){
        this.setState({file: file})
    }

    submit(){ /*
        form = new FormData();
        form.append(this.state)

        */

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
                                imageFile: document.getElementById('postFileField').files[0]
                        })
                    }).then(response => response.json()).then(data => console.log(data))
                    /*
                    .then(
                        data => {window.location.replace(data['url'])
                    })*/
                        });
                        
                    })
    }
}
if (document.getElementById('PostFormHolder')) {
   
    ReactDOM.render(<PostSubmitForm/>, document.getElementById('PostFormHolder'));
}