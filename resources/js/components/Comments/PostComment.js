
import React, { useState, useEffect } from 'react';
import Moment from '../Utility/Moment'
import VotingSystem from '../Posts/VotingSystem';
//don't forget to pass the votes into the voting system component

function PostComment(props) {
    let comment = props.comment
    console.log(comment)
    return (
        <div id= 'dataholder' data={[comment.id]}
        style = {{display: 'flex'}}
        >
            <VotingSystem id = {comment.id} type= {'comment'} ></VotingSystem>
            <div style= {{width: '100%'}}>
                <div style = {{display: 'flex'}}>
                    <h5>{comment.username}</h5>
                    <p> x points</p>
                    <Moment creator = {comment.username} timePosted = {comment.formattedStamp} type ={'time'}></Moment>
                </div>
                <div>
                    <p>{comment.body}</p>
                </div>
                <div>
                    <p>Reply</p>
                </div>
            </div>
        </div>
        

    );
}
export default PostComment;