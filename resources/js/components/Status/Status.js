import React, { useState } from 'react';
import VotingSystem from '../Posts/VotingSystem';
import StatusInput from '../SubmitPages/StatusInput';
import DeleteIcon from '@material-ui/icons/Delete';
//Feed a statement array into the Statement class as props
function Status({appendNewStatus, deleteStatus, status, userId, form}) {   
    
    const [replyClicked, setReplyClicked] = useState();
    
    if(form == 'feed'){
        return(
            <div onClick={()=>{window.location.replace('http://localhost:80/user/' + status.username + '/status/' + status.id)}} 
            key={status.id} 
            className = 'statement' 
            style={{borderColor: 'rgb(56, 68, 77)', border: '1px solid'}}>
                <div style={{display: 'flex', alignItems:'center'}}>
                    <VotingSystem id={status.id} type={'status'}></VotingSystem>
                    <img style={{height: '32px', width:'32px', objectFit: 'cover', alignSelf: 'center', borderRadius: '50%'}} src={status.pfp_url}></img>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <span>{status.username}</span>
                        <span>{"@" + status.username}</span>
                    </div>
                </div>
                <div className= "bodyAndFooter">
                    <div style= {{    height: '80%'}}>
                        <p style={{textAlign:'start', marginLeft:'9%'}}>{status.body}</p> 
                    </div>
                    <div style= {{display: 'flex', marginTop: '20px', marginLeft: '9%'}}>
                        <h5>{status.repliesCount + ' replies'}</h5>
                        {replyClicked && <StatusInput currentUserId = { userId} appendNewStatus={appendNewStatus} 
                        isReply={true}
                        parentStatusId = {status.id}
                        ></StatusInput>}
                        <span>Share</span>
                        <span onClick={()=> setReplyClicked(!replyClicked)}>Reply</span>
                    </div>
                </div>
            </div>
        )
        return (
        
            <div onClick={()=>{window.location.replace('http://localhost:80/user/' + status.username + '/status/' + status.id)}} key={status.id} className = 'statement' style={{borderColor: 'rgb(56, 68, 77)', border: '1px solid'}}> 
                <div style={{display: 'flex'}}>
                <img style={{height: '64px', width:'64px', objectFit: 'cover', alignSelf: 'center', borderRadius: '50%'}} src={status.pfp_url}></img>
                    <VotingSystem id={status.id} type={'status'}></VotingSystem>
                </div>
                <div className= "bodyAndFooter">
                    <div style= {{    height: '80%'}}>
                        <p>{status.body}</p> 
                    </div>
                    <div style= {{display: 'flex'}}>
                        <h5>{status.repliesCount + ' replies'}</h5>
                        <button onClick={ () => deleteStatus(status.id)}>Delete</button>
                    </div>
                </div>
            </div>
        
       
        );
    }
    else if (form == 'focus'){
        return(
            <div id='focusedStatus' style ={{background: 'white'}}>
                <div style={{display: 'flex', alignItems:'center'}}>
                    <VotingSystem id={status.id} type={'status'}></VotingSystem>
                    <img style={{height: '64px', width:'64px', objectFit: 'cover', alignSelf: 'center', borderRadius: '50%'}} src={status.pfp_url}></img>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <span>{status.username}</span>
                        <span>{"@" + status.username}</span>
                    </div>
                </div>
                <div className= "bodyAndFooter">
                    <div style= {{    height: '80%'}}>
                        <p style={{textAlign:'start', marginLeft:'9%'}}>{status.body}</p> 
                    </div>
                    <div style= {{display: 'flex', marginTop: '20px', marginLeft: '9%'}}>
                        <h5>{status.repliesCount + ' replies'}</h5>
                        {userId == status.user_id && <DeleteIcon onClick={ () => deleteStatus(status.id)}></DeleteIcon>}
                        {replyClicked && <StatusInput currentUserId = { userId} appendNewStatus={appendNewStatus} 
                        isReply={true}
                        parentStatusId = {status.id}
                        ></StatusInput>}
                        <span>Share</span>
                        <span onClick={()=> setReplyClicked(!replyClicked)}>Reply</span>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(<div>{form}</div>)
    }
}

export default Status;