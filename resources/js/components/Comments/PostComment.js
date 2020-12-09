
import React, { Component, useEffect } from 'react';
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

class PostComment extends Component {
    constructor(props){
        super(props)
        this.state = {
            nestLevel: this.props.nestLevel,
            replyClicked: false,
            additionalLines: [],
            minimized: false
        }
        this.toggleComment = this.toggleComment.bind(this);
    }
    ///when you create a comment via commentinput you check if you replied to one, if you did then you check the nested level and make it one more

    //when pulling from the database make sure to group posts into their own arrays with their relationship being comment and children
    
    //and then compile them into one array


    ///MAKE SURE

    //delete comments next

    //TO APPLY THE COMMENT PROPERTIES HERE SO THE INDENTATION HAPPENS NATURALLY


    applyProperties(){

    }
    
    toggleComment(){
        var commentId = this.props.comment.id
        var id = document.querySelector(`[data="${commentId}"]`)
        console.log(id)
       // var str = "[parent=" + e.target.getAttribute(id) + "]"
       // console.log(str)
       var refs = document.querySelectorAll(`[parentid="${commentId}"]`)
        if(this.state.minimized){
            for (let index = 0; index < refs.length; index++) {
                refs[index].style.display = 'flex';
            }
        }else{
            for (let index = 0; index < refs.length; index++) {
                refs[index].style.display = 'none';
            }
        }
        
        this.setState({minimized: !this.state.minimized})
        console.log(refs)
    }
    /*
    componentDidMount(){
        console.log('propsfrom cdm' + this.props)
        var id;
        var memeArray = []
        var memes = (<div className="v2"> <div style={{width: '50%'}}></div> <div className = 'meme' style={{width: '50%'}}></div></div>)
        for (let i = 0; i < this.props.comment.nest_level; i++) {
            memeArray.push(memes)
        }
        this.setState({additionalLines: memeArray})
        //make additional lines here

    }
    */
//  every comment has a line, this line is indented to a consistent position regardless of the comment's indentation. If you clikc this button at and point then you can
// grab the paren't id property on said comment, then hide the parent comment or transform it into the minimized version
//and tthen create as many lines as you have indentations or something similar

        //







        //HERE WE'RE GOING TO RENDER THE DELETED COMMENT TEMPLATE IF THE COMMENT'S isDeleted BOOL FIELD === TRUE






    render(){
        if(this.state.minimized){
            return(
                <div style= {{width: '100%'}}>
                        <div style = {{display: 'flex'}}>
                            <AddIcon onClick = {(e) => this.toggleComment()}></AddIcon>
                            <p className = "commentHeaderText">{this.props.comment.username}</p>
                            <p className = "commentHeaderText"> x points</p>
                            <Moment className="commentHeaderText" creator = {this.props.comment.username} timePosted = {this.props.comment.formattedStamp} type ={'time'}></Moment>
                            <p>x children</p>
                        </div>
                    </div>
            )
        }
        return (
            <div style={{display:'flex', borderRadius: '0.5px', borderTop: '2px solid #dae0e6'}}>
            {this.state.additionalLines}
                <div className = {'indent' + this.props.comment.nest_level} data={[this.props.comment.id]} parentid={this.props.comment.parent_comment_id} style = {{display: 'flex', flexGrow: this.props.comment.nest_level, marginRight: '5%',}}>
                    
                    <div style= {{display: 'flex', flexDirection: 'column', width: '3%',}}>
                        <div style= {{height: '70%'}}>
                            <VotingSystem userId = {this.props.userId} id = {this.props.comment.id} type= {'comment'} ></VotingSystem>
                        </div>
                    </div>
                    
                    <div style= {{width: '100%'}}>
                        <div style = {{display: 'flex'}}>
                            <RemoveIcon onClick = {(e) => this.toggleComment()}></RemoveIcon>
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
                            {this.props.userId === this.props.comment.creator_id && <DeleteIcon onClick = {(e) =>this.props.deleteComment(this.props.comment.id)}></DeleteIcon>}
                        </div>
                    </div>
                </div>
                {this.state.replyClicked && <CommentInput isReply = {true} userId = {this.props.userId} comment = {this.props.comment} appendNewComment = {this.props.appendNewComment} parentPostId = {this.props.comment.parent_post_id}></CommentInput>}
            </div>
        );
    }
    
}
export default PostComment;