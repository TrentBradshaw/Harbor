import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import PostContentField from './PostContentField'

class CreatePost extends Component {
    constructor(props){
        super(props);

        this.state = {
            mainInfo: {
                highlighted: 'text',
                title:'',
                tags:'',
                spoiler:false,
                nsfw:false,
                creator:'',
                timeCreated:'',
            },
            
            type: {
                text:{
                   body:'',
                },
                media:{
                    media_url:'',
                },
                link:{
                    url:'',
                }
            },
        }
    }

    forceUpdateHandler(){
        this.forceUpdate();
    };
    changePostType = (type) => {
        if (type == "text"){
            this.state.highlighted = "text"
            this.forceUpdateHandler();
        }else if (type == "media"){
            this.state.highlighted = "media"
            this.forceUpdateHandler();
        }
        else{
           this.state.highlighted ="link"
           this.forceUpdateHandler();
        }
        console.log(this.state.highlighted)
    }
    
    render() {
        return (
            <form action="/api/dock" method="POST">
                <div>
                    <h1>Create a Post</h1>
                </div>
                <div>
                    <input type='text' placeholder='Choose a destination for this post'></input>
                    <input type='text' placeholder='title' name='title' onChange = { (e) => {this.state.mainInfo.title = e.target.value}}></input>
                </div>
                <div>
                    <button type="button" onClick={ () => {this.changePostType('text')}}>Text</button>
                    <button type="button" onClick={ () => {this.changePostType('media')}}>Media</button>
                    <button type="button" onClick={ () => {this.changePostType('link')}}>Link</button>
                </div>
                    <PostContentField  changeContent={this.changeContent} highlighted = {this.state.highlighted}></PostContentField>
                <div>
                    <div>
                    <button>Spoiler</button>
                    <button>NSFW</button>
                </div>
                    <div>
                        <button type="button" onClick={()=>{this.submit()}}>SUBMIT</button>
                    </div>
                </div>
            </form>
        )
    }

    changeContent(type){
        if (type =='text'){
            console.log('text');
        } else if (type =='media'){
            console.log('media')
        } else if (type='link'){
            console.log('link')
        }

    }
    submit(){
        var postSpecificInfo;
        switch (this.state.mainInfo.highlighted) {
            case 'text':
                postSpecificInfo = this.state.type.text.body;
                break;
            case 'media':
                postSpecificInfo = this.state.type.media.media_url;
                break;
            case 'link':
                postSpecificInfo = this.state.type.link.url;
        
            default:
                break;
        }
        console.log(this.state)
        fetch('http://127.0.0.1:8000/api/dock', {
            headers:{
                'Content-Type':'application/json',
            },
            method: 'post',
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({
                    highlighted: this.state.mainInfo.highlighted,
                    title: this.state.mainInfo.title,
                    tags: this.state.mainInfo.tags,
                    spoiler: this.state.mainInfo.spoiler,
                    nsfw: this.state.mainInfo.nsfw,
                    creator: this.state.mainInfo.creator,
                    timeCreated: this.state.mainInfo.timeCreated,
                    body: this.state.type.text.body,
                    media_url: this.state.type.media.media_url,
                    url: this.state.type.link.url
            })
            //JSON.stringify({
              //  obj : this.state;
                //mainInfo: this.state.mainInfo, 
                //specialInfo: postSpecificInfo
            //})
            
        }).then(response => response.json())
        .then(data => {window.location = data.redirect;})
    }
}
if (document.getElementById('CreatePostHolder')) {
   
    ReactDOM.render(<CreatePost/>, document.getElementById('CreatePostHolder'));
}