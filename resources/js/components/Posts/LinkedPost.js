import VotingSystem from './VotingSystem';
import Moment from '../Utility/Moment';
import React, { useState, useEffect } from 'react';
//don't forget to pass the votes into the voting system component

function LinkedPost(props) {
    console.log('dabbie')
    return (
        <div id = '1' style ={{ display: 'flex', }}>
            <VotingSystem></VotingSystem>
            {props.state.grabbedData.imageAndTitleFound ? (
                <div id= '2' style ={{ display: 'flex', }}>
                    <img style = {{ height: '100px', width: '150px' }}src= {props.state.grabbedData.img}></img>
                    <div>
                        <h2 style = {{height: '45%'}}>{props.state.grabbedData.title}</h2>
                        <div style = {{display: 'flex', marginTop: '15px'}}>
                            <Moment creator = {props.state.creatorUsername} timePosted = {props.state.formattedStamp}></Moment>
                            <p>x commments</p>
                            <p>share</p>
                        </div>
                    </div>
                </div>
                ) : ( <div><h1>metadata not found</h1></div>
            )}
        </div>
    );
}
export default LinkedPost;
