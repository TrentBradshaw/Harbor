
import React, { Component, useEffect } from 'react';
import Moment from '../Utility/Moment'
import VotingSystem from '../Posts/VotingSystem';
import CommentInput from './CommentInput';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ReplyIcon from '@material-ui/icons/Reply';
import ShareIcon from '@material-ui/icons/Share';

//don't forget to pass the votes into the voting system component

class PostComment extends Component {
    constructor(props){
        super(props)
        this.state = {
            nestLevel: this.props.nestLevel,
            replyClicked: false
        }
    }
    ///when you create a comment via commentinput you check if you replied to one, if you did then you check the nested level and make it one more

    //when pulling from the database make sure to group posts into their own arrays with their relationship being comment and children
    
    //and then compile them into one array
    render(){
        return (
            <div>
                <div data={[this.props.comment.id]} style = {{display: 'flex', borderRadius: '2px', border: '2px solid #dae0e6', marginLeft: '1%', marginRight: '10%', marginBottom: '20px', }}>
                    <VotingSystem id = {this.props.comment.id} type= {'comment'} ></VotingSystem>
                    <div style= {{width: '100%'}}>
                        <div style = {{display: 'flex'}}>
                            <p className = "commentHeaderText">{this.props.comment.username}</p>
                            <p className = "commentHeaderText"> x points</p>
                            <Moment className="commentHeaderText" creator = {this.props.comment.username} timePosted = {this.props.comment.formattedStamp} type ={'time'}></Moment>
                        </div>
                        <div>
                            <p className = "commentText" style={{ marginLeft: '10px', marginTop: '10px', textAlign: 'start', overflowWrap: 'anywhere'}} >{this.props.comment.body}</p>
                        </div>
                        <div style ={{ display: 'flex', marginTop: '10px',marginLeft: '20px',}}>
                            
                            <ReplyIcon onClick = {(e) => this.setState({replyClicked: true})} style= {{marginLeft: '10px', fill: 'slategrey'}}></ReplyIcon>
                            <div style = {{display: 'flex', marginLeft: '20px'}}>
                                <p>{0}</p>
                                <QuestionAnswerIcon style={{fill: 'slategrey'}}></QuestionAnswerIcon>
                            </div>
                            <ShareIcon style= {{marginLeft: '20px', textAlign: 'start', fill: 'slategrey'}}></ShareIcon>
                        </div>
                    </div>
                </div>
                {this.state.replyClicked && <CommentInput isReply = {true} comment = {this.props.comment} appendNewComment = {this.props.appendNewComment} parentPostId = {this.props.comment.parent_post_id}></CommentInput>}
            </div>
            
        );
    }
    
}
export default PostComment;