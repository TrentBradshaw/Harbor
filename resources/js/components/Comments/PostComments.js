
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

    
    appendNewComment(commentObject, isReply, parentCommentId){
    
        
        //console.log('NCDb' + newCommentsDict)
        console.log("comment object" + JSON.stringify(commentObject))
        var newCommentsDict;
        var commentsArray = this.state.commentsArray 
        var index;
        if (isReply){
            console.log('parentCommentID' + parentCommentId)
            console.log(JSON.stringify(commentsArray))
            //let newArray = this.state.commentsArray.concat(commentObject)
            for (let i = 0; i < commentsArray.length; i++) {
                console.log(commentsArray[i]['id'] + 'cereee')
                if(commentsArray[i]['id'] === parentCommentId){
                    console.log('i FOUNDDDD' + i)
                   index = i;
                }
            }
            console.log('index ' + index)
            var newArray =  commentsArray.splice(index++,0, commentObject)
            console.log("new array " + newArray)
            this.setState({commentsArray: newArray})
            newCommentsDict = this.state.commentsDict;
            newCommentsDict.splice(index, 0, <PostComment key = {commentObject['id']} comment = {commentObject}></PostComment>)
        }else{
            let newArray = this.state.commentsArray.concat(commentObject)
            this.setState({commentsArray: newArray})
            newCommentsDict = this.state.commentsDict;
            newCommentsDict.unshift(<PostComment key = {commentObject['id']} comment = {commentObject}></PostComment>)
        }
        
        //console.log('NCDa' + newCommentsDict)
        this.setState({commentsDict: newCommentsDict})
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
                    console.log("Data ------------------------" + JSON.stringify(data))
                    this.setState({isLoading: false})
                    this.setState({commentsArray: data['comments']});
                    let commentsDictt = this.state.commentsDict;
                    let comments = data['comments']
                    console.log('commarrlength' + data.length)
                    for (let i = 0; i < comments.length; i++) {
                        commentsDictt.push( <PostComment key = {comments[i].id} appendNewComment = {this.appendNewComment} comment= {comments[i]}></PostComment>)
                    }
                    this.setState({commentsDict: commentsDictt})
                });
            })
    }
    
   
    render(){
        if (this.state.isLoading) { return <div className="App">Loading...</div> }
        let commentsDict = this.state.commentsDict;
        return (
            <div>
                <CommentInput style = {{height: '120px'}} isReply = {false} appendNewComment = {this.appendNewComment} parentPostId = {this.props.parentPostId}></CommentInput>
                <div id = "commentsholder">
                    {this.state.commentsDict}
                </div>
            </div>
        );
    }
    
}
export default PostComments;