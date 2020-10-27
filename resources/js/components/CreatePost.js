import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import PostSpecificationButtons from './PostSpecificationButtons'
import PostForm from './PostForm'
import PostContentField from './PostContentField'

class CreatePost extends Component {
    constructor(props){
        super(props);

        this.state = {
            highlighted: 'text',
            title:'',
            body:'',
            flairs:'',
            spoiler:'',
            nsfw:'',
            creator:'',
            timeCreated:''
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
    
    submit(){
        console.log(this.state)
    }
    render() {
        const text = this.state.highlighted == 'text';
        const media = this.state.highlighted == 'media';
        const link = this.state.highlighted == 'link';
        console.log(text)
    
        return (
            
            <form type='submit'>
                <div>
                    <h1>Create a Post</h1>
                </div>
                <div>
                    <input type='text' placeholder='Choose a destination for this post'></input>
                </div>
                <div>
                    <button type="button" onClick={ () => {this.changePostType('text')}}>Text</button>
                    <button type="button" onClick={ () => {this.changePostType('media')}}>Media</button>
                    <button type="button" onClick={ () => {this.changePostType('link')}}>Link</button>
                </div>
                    <PostContentField highlighted = {this.state.highlighted}></PostContentField>
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
        /*
        {if (this.state.highlighted == "text"){
            return(
                <div>
                
                <div >
                    <div>
                        <PostSpecificationButtons changePostType = {this.changePostType} forceUpdateHandler={this.forceUpdateHandler}></PostSpecificationButtons>
                    </div>
                    <form action="submit" id="submit-form">
                        <PostForm highlighted ={this.state.highlighted}></PostForm>
                        
                    </form>
                </div>
            </div>
            );
            
        }else if (type == "media"){
            this.state.highlighted = "text"
            this.forceUpdateHandler();
        }
        else{
            this.state.highlighted = "link"
              this.forceUpdateHandler();
        }
        
    }
    */
}
if (document.getElementById('CreatePostHolder')) {
   
    ReactDOM.render(<CreatePost/>, document.getElementById('CreatePostHolder'));
}
