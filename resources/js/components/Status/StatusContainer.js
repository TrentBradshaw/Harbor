import React, { useState } from 'react';
function StatusContainer({appendNewStatus, deleteStatus, statusArray}){
   
    commentsArray.map((element)=>(
        <PostComment userId = {userId} key = {element.id} deleteComment = {deleteComment} appendNewComment = {appendNewComment} comment = {element}></PostComment>
    ))
}

export default StatusContainer;