import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import PostSpecificationButtons from './PostSpecificationButtons'
import PostForm from './PostForm'

class CreatePost extends Component {
    constructor(props){
        super(props);

        this.state = {
            highlighted: 'text'
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
            this.state.highlighted = "link"
              this.forceUpdateHandler();
        }
        console.log(this.state.highlighted)
    }
    
    
    render() {
        const text = this.state.highlighted == 'text';
        const media = this.state.highlighted == 'media';
        const link = this.state.highlighted == 'link';
        console.log(text)
    
        return (
            
            <div>
            <h1>reee</h1>
                {(() => {
                if (text) {
                    return (
                        <div>
                            <div >
                                <div>
                                    <PostSpecificationButtons changePostType = {this.changePostType} 
                                    forceUpdateHandler={this.forceUpdateHandler}></PostSpecificationButtons>
                                </div>
                                <form action="submit" id="submit-form">
                                    <PostForm highlighted ={this.state.highlighted}></PostForm>
                                    <div>TEXT</div>
                                    <button type="submit">SUBMIT</button>
                                </form>
                            </div>
                        </div>
                    
                    )
                } else if (media) {
                    return (
                        <div>
                            <div >
                                <div>
                                    <PostSpecificationButtons changePostType = {this.changePostType} 
                                    forceUpdateHandler={this.forceUpdateHandler}></PostSpecificationButtons>
                                </div>
                                <form action="submit" id="submit-form">
                                    <PostForm highlighted ={this.state.highlighted}></PostForm>
                                    <div>MEDIA</div>
                                    <button type="submit">SUBMIT</button>
                                </form>
                            </div>
                        </div>
                    )
                } else if (link) {
                    return (
                        <div>
                            <div >
                                <div>
                                    <PostSpecificationButtons changePostType = {this.changePostType} 
                                    forceUpdateHandler={this.forceUpdateHandler}></PostSpecificationButtons>
                                </div>
                                <form action="submit" id="submit-form">
                                    <PostForm highlighted ={this.state.highlighted}></PostForm>
                                    <div>LINK</div>
                                    <button type="submit">SUBMIT</button>
                                </form>
                            </div>
                        </div>
                    )
                }
                })()}
            </div>
            
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
                        <button type="submit">SUBMIT</button>
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
