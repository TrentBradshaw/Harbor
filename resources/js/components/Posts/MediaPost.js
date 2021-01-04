import VotingSystem from './VotingSystem';
import Moment from '../Utility/Moment';
import React, { useState, useEffect } from 'react';

function MediaPost(props) {
    console.log('dabbie')
    console.log(props + ' from mediapost')
    return (
        <div id = '1' style ={{ display: 'flex', }}>

            <div>
                <img src= {props.state.media_url}></img>
            </div>
        </div>
    );
}
export default MediaPost;