
import React, { useState, useEffect } from 'react';
import Moment from '../Utility/Moment'
import VotingSystem from '../Posts/VotingSystem';
//don't forget to pass the votes into the voting system component

function PostComment(props) {
    let comment = props.comment
    console.log(comment)
    return (
        <div>
            <VotingSystem></VotingSystem>
            <div>
                <div>
                    <h5>{comment.username}</h5>
                    <p> x points</p>
                </div>
                <div>
                    <p>{comment.body}</p>
                </div>
            </div>
        </div>
        

    );
}
export default PostComment;