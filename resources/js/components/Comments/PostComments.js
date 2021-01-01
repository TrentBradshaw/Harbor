
import React, { useState, useEffect } from 'react';
import CommentInput from './CommentInput';
import PostComment from './PostComment'
//don't forget to pass the votes into the voting system component

const  PostComments = ({parentPostId}) => {
    
    const [isLoading, changeLoading] = useState(true);
    const [commentsArray, changeCommentsArray] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData =() =>{
        let url = new URL('http://localhost:80/api/comments')
        let param = {query: parentPostId}

        url.search = new URLSearchParams(param).toString();
        fetch(url, {
            headers:{'X-CSRF-TOKEN': document.getElementById('csrf-token').getAttribute('content'),'Content-Type':'application/json',"Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true },
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
        let tempCommentsArray = [...commentsArray]; 
        let index;
        if (isReply){
            for (let i = 0; i < tempCommentsArray.length; i++) {
                if(tempCommentsArray[i]['id'] === parentCommentId){
                    console.log('i: ' + i)
                  index = i + 1;
                  console.log('index: ' + index)
                }
            }
            tempCommentsArray.splice(index,0, commentObject)
            console.log(tempCommentsArray)
            changeCommentsArray(tempCommentsArray)
        }else{
            tempCommentsArray.unshift(commentObject)
            console.log(tempCommentsArray)
            changeCommentsArray(tempCommentsArray)
        }
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
        }).then(
            data => { 
                console.log('data from commentinput----------------------' + JSON.stringify(data))
                /*
                let tempCommentsArray = [...commentsArray]; 
                let index;
                for (let i = 0; i < tempCommentsArray.length; i++) {
                    if(tempCommentsArray[i]['id'] === id){
                        console.log('id: '+ id)
                        console.log('commentId: ' + tempCommentsArray[i]['id'])
                        console.log('i: ' + i)
                      index = i;
                      console.log('index: ' + index)
                    }
                
                tempCommentsArray.splice(index,1)
                console.log(tempCommentsArray)
                changeCommentsArray(tempCommentsArray)
                
                } */
            })
    } 
    if (isLoading) { return <div className="App">Loading...</div> }
    return (
        <div>
            <CommentInput style={{height: '120px'}} 
            isReply={false}
            parentComment={null}   
            appendNewComment = {appendNewComment} 
            parentPostId={parentPostId}>
            hideInput={null}
            </CommentInput>
            <div id = "commentsholder">
            {
                commentsArray.map((element)=>(
                    <PostComment key = {element.id} deleteComment = {deleteComment} appendNewComment = {appendNewComment} comment = {element}></PostComment>
            ))}
            </div>
        </div>
    );
}

   
export default PostComments;