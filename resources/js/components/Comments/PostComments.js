
import React, { useState, useEffect } from 'react';
import CommentInput from './CommentInput';
import PostComment from './PostComment'
//don't forget to pass the votes into the voting system component

const  PostComments = (props) => {
    
    const [isLoading, changeLoading] = useState(true);
    const [commentsArray, changeCommentsArray] = useState([]);
    const [userId, changeUserId] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData =() =>{
        let token = document.getElementById('csrf-token').getAttribute('content')
       fetch('/userdetails', 
           {
               headers:{ 'X-CSRF-TOKEN': token, 'Content-Type':'application/json',},
               method: 'post',
               mode: "same-origin",
               credentials: "same-origin",
           }).then((response) => {
                response.json().then((data) => {
                console.log(data['username']);
                changeUserId(data['id'])
               })
            })
        var url = new URL('http://localhost:80/api/comments')
        let param = {query: props.parentPostId}

        url.search = new URLSearchParams(param).toString();
        fetch(url, {
            headers:{'X-CSRF-TOKEN': token,'Content-Type':'application/json',"Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true },
            method: 'get',
            mode: "cors",
            credentials: "same-origin",
            }).then((response) => {
                response.json().then((data) => {
                    console.log("Data ------------------------" + JSON.stringify(data))
                    changeLoading(false)
                    changeCommentsArray(data['comments'])
                });
            })
    }
    function appendNewComment(commentObject, isReply, parentCommentId){
    
        var tempCommentsArray = commentsArray; 
        var index;
        if (isReply){
            console.log('parentCommentID' + parentCommentId)
            console.log(JSON.stringify(tempCommentsArray))
            //let newArray = this.state.commentsArray.concat(commentObject)
            for (let i = 0; i < tempCommentsArray.length; i++) {
                console.log(tempCommentsArray[i]['id'] + 'cereee')
                if(tempCommentsArray[i]['id'] === parentCommentId){
                    console.log('i FOUNDDDD' + i)
                   index = i;
                }
            }
            //actually insert the new comment object in the right place






            
            console.log('index ' + index)
            var newArray =  commentsArray.splice(index++,0, commentObject)
            changeCommentsArray(newArray)
        }else{
            let newArray = commentsArray.concat(commentObject)
            changeCommentsArray(newArray)
            
        }
    }

    if (isLoading) { return <div className="App">Loading...</div> }
    return (
        <div>
            <CommentInput userId={userId} style={{height: '120px'}} isReply={false} appendNewComment={props.appendNewComment} parentPostId={props.parentPostId}></CommentInput>
            <div id = "commentsholder">
            {
                commentsArray.map((element)=>(
                    <PostComment userId = {userId} key = {element.id} deleteComment = {deleteComment} appendNewComment = {appendNewComment} comment = {element}></PostComment>
            ))}
            </div>
        </div>
    );
}

   function deleteComment(id){
    
        //if the comment is deleted and a parrent then just update the properties to say deleted comment
        let token = document.getElementById('csrf-token').getAttribute('content')
        //ADD THE FETCH
        fetch('/api/comments/delete', {
            headers:{'X-CSRF-TOKEN': token, 'Content-Type':'application/json',},
            method: 'put',
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({id: id})
        }).then(response => response.json(
            console.log(response)
        ))
        .then(
            data => { 
                console.log('data from commentinput----------------------' + JSON.stringify(data))
            })
    }

    
    
    
        
    
    
export default PostComments;