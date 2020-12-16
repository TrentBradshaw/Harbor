
import React, { useState, useEffect } from 'react';
import Moment from '../Utility/Moment'
import VotingSystem from '../Posts/VotingSystem';
import CommentInput from './CommentInput';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ReplyIcon from '@material-ui/icons/Reply';
import ShareIcon from '@material-ui/icons/Share';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
//don't forget to pass the votes into the voting system component

    function PostComment({userId, deleteComment, appendNewComment, comment})  {

        //console.log('PROPPPUSSS FROM POSTCOMMENT' + JSON.stringify())
        const [nestLevel, changeNestLevel] = useState(comment.nestLevel)
        const [additionalLines, changeAdditionalLines] = useState([])
        const [minimized, toggleMinimized] = useState(false)
        const [deleted, updateDeleted] = useState(false)
        const [replyClicked, updateReplyClicked] = useState(false)
        function handleInputChange(value){
            updateReplyClicked(value)
        }
        function toggleComment(commentId){
            let id = document.querySelector(`[data="${commentId}"]`)
            console.log(id)
           // var str = "[parent=" + e.target.getAttribute(id) + "]"
           // console.log(str)
           let refs = document.querySelectorAll(`[parentid="${commentId}"]`)
            if(minimized){
                for (let index = 0; index < refs.length; index++) {
                    refs[index].style.display = 'flex';
                }
            }else{
                for (let index = 0; index < refs.length; index++) {
                    refs[index].style.display = 'none';
                }
            }
            toggleMinimized(!minimized)
        }

        useEffect(() => {
            initialize();
          }, []);

        function initialize(){
            console.log(JSON.stringify(comment))
            
            console.log('reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
            console.log(comment.isDeleted + 'cmdel')
            updateDeleted(comment.isDeleted)
        }

        function handleDeleteComment(id){
            updateDeleted(true)
            deleteComment(id)

        }
        //modularize all of this into bottom taskbar and header and the like
        if(deleted){
            return(
                <div className = {'indent' + comment.nest_level} data={[comment.id]} parentid={comment.parent_comment_id} style={{minHeight: '100px', borderRadius: '0.5px', borderTop: '2px solid #dae0e6'}}>
                    <p className = "commentDeletedHeader"> comment deleted</p>
                </div>
                
            )
        }
        if(minimized){
            return(
                <div style= {{width: '100%', minHeight: '100%', borderRadius: '0.5px', borderTop: '2px solid #dae0e6'}}>
                        <div className = {'indent' + comment.nest_level} data={[comment.id]} parentid={comment.parent_comment_id} style = {{display: 'flex', flexGrow: comment.nest_level, marginRight: '5%'}}>
                            <AddIcon onClick = {(e) => toggleComment(comment.id)}></AddIcon>
                            <p className = "commentHeaderText">{comment.username}</p>
                            <p className = "commentHeaderText"> x points</p>
                            <Moment className="commentHeaderText" creator = {comment.username} timePosted = {comment.formattedStamp} type ={'time'}></Moment>
                            <p>x children</p>
                        </div>
                    </div>
            )
        }
        return (
            <div style={{display:'flex', borderRadius: '0.5px', borderTop: '2px solid #dae0e6', minHeight: '100px'}}>
            {additionalLines}
                <div className = {'indent' + comment.nest_level} data={[comment.id]} parentid={comment.parent_comment_id} style = {{display: 'flex', flexGrow: comment.nest_level, marginRight: '5%',}}>
                    
                    <div style= {{display: 'flex', flexDirection: 'column', width: '3%',}}>
                        <div style= {{height: '70%'}}>
                            <VotingSystem userId = {userId} id = {comment.id} type= {'comment'} ></VotingSystem>
                        </div>
                    </div>
                    
                    <div style= {{width: '100%'}}>
                        <div style = {{display: 'flex'}}>
                            <RemoveIcon onClick = {(e) => toggleComment(comment.id)}></RemoveIcon>
                            <p className = "commentHeaderText">{comment.username}</p>
                            <p className = "commentHeaderText"> x points</p>
                            <Moment className="commentHeaderText" creator = {comment.username} timePosted = {comment.formattedStamp} type ={'time'}></Moment>
                        </div>
                        <div>
                            <p className = "commentText" style={{ marginLeft: '10px', marginTop: '10px', textAlign: 'start', overflowWrap: 'anywhere'}} >{comment.body}</p>
                        </div>
                        <div style ={{ display: 'flex', marginTop: '10px',marginLeft: '20px',}}>
                            
                            <ReplyIcon onClick = {(e) => updateReplyClicked(true)} style= {{marginLeft: '10px', fill: 'slategrey'}}></ReplyIcon>
                            <div style = {{display: 'flex', marginLeft: '20px'}}>
                                <p>{0}</p>
                                <QuestionAnswerIcon style={{fill: 'slategrey'}}></QuestionAnswerIcon>
                            </div>
                            <ShareIcon style= {{marginLeft: '20px', textAlign: 'start', fill: 'slategrey'}}></ShareIcon>
                            {userId === comment.creator_id && <DeleteIcon onClick = {(e) => handleDeleteComment(comment.id)}></DeleteIcon>}
                        </div>
                    </div>
                </div>
                {replyClicked && <CommentInput 
                    isReply = {true} 
                    userId = {userId} 
                    parentComment = {comment} 
                    appendNewComment = {appendNewComment} 
                    parentPostId = {comment.parent_post_id}
                    hideInputChange = {handleInputChange}
                    >
                    </CommentInput>}
            </div>
        );
        
    }
    ///when you create a comment via commentinput you check if you replied to one, if you did then you check the nested level and make it one more
    //when pulling from the database make sure to group posts into their own arrays with their relationship being comment and children
    //and then compile them into one array


export default PostComment;