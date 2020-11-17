import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import PostContentField from './PostContentField' 
import AutoCompleteDockLookup from '../AutoComplete/AutoCompleteDockLookup'

class PostSubmitForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            mainInfo: {
                highlighted: 'text',
                title:'',
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

    changePostType = (type) => {
        if (type == "text"){ 
            this.setState({
                mainInfo: {
                    ...this.state.mainInfo,
                    highlighted: 'text'
                }
            })
        }else if (type == "media"){
            this.setState({
                mainInfo: {
                    ...this.state.mainInfo,
                    highlighted: 'media'
                }
            })
        }
        else{ 
            this.setState({
                mainInfo: {
                    ...this.state.mainInfo,
                    highlighted: 'link'
                }
            })
        }
        console.log(this.state.mainInfo.highlighted)
    }
    
    render() {
        return (
            <form action="/api/post/submit" method="POST" style={{width: "700px", marginLeft: '30%'}}>
                <div>
                    <h1>Create a Post</h1>
                </div>
                <div>
                    <AutoCompleteDockLookup type='text' placeholder='Choose a destination for this post'></AutoCompleteDockLookup>
                   
                    <input type='text' placeholder='title' name='title' onChange = { (e) => {this.state.mainInfo.title = e.target.value}}></input>
                </div>
                <div>
                    <button type="button" onClick={ () => {this.changePostType('text')}}>Text</button>
                    <button type="button" onClick={ () => {this.changePostType('media')}}>Media</button>
                    <button type="button" onClick={ () => {this.changePostType('link')}}>Link</button>
                </div>
                    <PostContentField  changeContent={this.changeContent} highlighted = {this.state.mainInfo.highlighted}></PostContentField>
                <div>
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
        fetch('http://127.0.0.1:8000/api/post/submit', {
            headers:{
                'Content-Type':'application/json',
            },
            method: 'post',
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({
                    highlighted: this.state.mainInfo.highlighted,
                    title: this.state.mainInfo.title,
                    creator: this.state.mainInfo.creator,
                    timeCreated: this.state.mainInfo.timeCreated,
                    body: this.state.type.text.body,
                    media_url: this.state.type.media.media_url,
                    url: this.state.type.link.url
            })
        }).then(response => response.json())
        .then(data => {window.location = data.redirect;})
    }
}
if (document.getElementById('PostFormHolder')) {
   
    ReactDOM.render(<PostSubmitForm/>, document.getElementById('PostFormHolder'));
}