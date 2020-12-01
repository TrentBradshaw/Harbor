
import React, { useState, useEffect } from 'react';
import CommentInput from './CommentInput';
import PostComment from './PostComment'
//don't forget to pass the votes into the voting system component

function PostComments(props) {
    console.log('dabbie')
    return (
        <div>
            
            <CommentInput parentPostId = {props.parentPostId}></CommentInput>
            <div id = "commentsholder">
                <PostComment></PostComment>
            </div>
        </div>
    );
}
export default PostComments;