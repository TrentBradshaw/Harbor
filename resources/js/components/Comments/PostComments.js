
import React, { Component } from 'react';
import CommentInput from './CommentInput';
import PostComment from './PostComment'
//don't forget to pass the votes into the voting system component

class PostComments extends Component {
    constructor(props){
        super(props);
        console.log('props' + this.props)
        
        this.appendNewComment = this.appendNewComment.bind(this);

        this.state = {
            isLoading: true,
            commentsArray: [],
            commentsDict: [],
        }
        
    }

    
    appendNewComment(commentObject){
        let grabbedState = this.state.commentsArray
        console.log("CommentObject" + commentObject);
        this.setState({commentsArray: this.state.commentsArray.concat(commentObject)})
       // let updatedState = grabbedState.push(commentObject)
        //this.setState({commentsArray: updatedState})
    }
    
    componentDidMount () {

        let token = document.getElementById('csrf-token').getAttribute('content')
       // let parentPostID = this.props.parentPostID

        var url = new URL('http://localhost:80/api/comments')
        let param = {query: this.props.parentPostId}

        url.search = new URLSearchParams(param).toString();
        fetch(url, {
            headers:{
                'X-CSRF-TOKEN': token,
                'Content-Type':'application/json',
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : true 
            },
            method: 'get',
            mode: "cors",
            credentials: "same-origin",
            }).then((response) => {
                response.json().then((data) => {
                    console.log(JSON.stringify(data))
                    console.log('commentsArray ' + data['comments'])
                    this.setState({isLoading: false})
                    this.setState({commentsArray: data});

                    
                    let commentsDict = this.state.commentsDict;
                    let comments = data['comments']
                    console.log('commarrlength' + data.length)
                    for (let i = 0; i < comments.length; i++) {
                        commentsDict.push( <PostComment key = {comments[i].id} comment= {comments[i]}></PostComment>)
                    }
                    this.setState({commentsDict: commentsDict})
                });
            })
        

    }

   
    render(){
        if (this.state.isLoading) { return <div className="App">Loading...</div> }
        let commentsDict = this.state.commentsDict;
        return (
            <div>
                <CommentInput appendNewComment = {this.appendNewComment} parentPostId = {this.props.parentPostId}></CommentInput>
                <div id = "commentsholder">
                    {commentsDict}
                </div>
            </div>
        );
    }
    
}
export default PostComments;