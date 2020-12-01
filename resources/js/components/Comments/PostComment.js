
import React, { useState, useEffect } from 'react';
import Moment from '../Utility/Moment'
import VotingSystem from '../Posts/VotingSystem';
//don't forget to pass the votes into the voting system component

function PostComment(props) {
    console.log('dabbie')
    return (
        <div>
            <VotingSystem></VotingSystem>
            <div>
                <div>
                    <h5> username</h5>
                    <p> x points</p>
                    <Moment></Moment>
                </div>
                <div>
                    <p>comment</p>
                </div>
            </div>
        </div>
        

    );
}
export default PostComment;