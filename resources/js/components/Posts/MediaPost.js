import VotingSystem from './VotingSystem';
import Moment from '../Utility/Moment';
import React, { useState, useEffect } from 'react';

function MediaPost(props) {
    console.log('dabbie')
    return (
        <div id = '1' style ={{ display: 'flex', }}>
            <VotingSystem></VotingSystem>
            <img></img>
            <h4>{ "d/" + props.state.communityTitle}</h4>
            <p>{"Posted by u/" + props.state.creatorUsername}</p>

            <div>
                <img src= {props.state.media_url}></img>
            </div>
            
            <h2 style = {{height: '45%'}}>{props.state.title}</h2>
            <div style = {{display: 'flex', marginTop: '15px'}}>
                <Moment creator = {props.state.creatorUsername} timePosted = {props.state.formattedStamp}></Moment>
                <p>x commments</p>
                <p>share</p>
            </div>
        </div>
    );
}
export default MediaPost;