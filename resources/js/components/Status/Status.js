import React, { useState } from 'react';
import VotingSystem from '../Posts/VotingSystem';
//Feed a statement array into the Statement class as props
function Status({appendNewStatus, deleteStatus, status, userId}) {   

    return (
        <div key={status.id} className = 'statement' style={{borderColor: 'rgb(56, 68, 77)', border: '1px solid'}}> 
            <div style={{display: 'flex'}}>
                <div>photo</div>
                <VotingSystem userId = {userId} id={status.id} type={'status'}></VotingSystem>
            </div>
            <div className= "bodyAndFooter">
                <div style= {{    height: '80%'}}>
                    <p>{status.body}</p> 
                </div>
                <div style= {{display: 'flex'}}>
                    <h5>comments</h5>
                    <h5>Like</h5>
                    <button onClick={ () => deleteStatus(status.id)}>Delete</button>
                </div>
            </div>
            
        </div>
    );
}

export default Status;