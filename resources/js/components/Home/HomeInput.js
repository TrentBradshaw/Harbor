
import React, { useState } from 'react';
import ImageIcon from '@material-ui/icons/Image';
import PostSubmitForm from '../SubmitPage/PostSubmitForm'
import StatusInput from '../SubmitPage/StatusInput'

//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function HomeInput({currentUserId}) {
    const [inputType, changeInputType] = useState('status');
    
    function handleInputSwitch(inputType){
        changeInputType(inputType)
    }
            return (
                <div id="homeInput">
                    <button className="tab" onClick={ () =>handleInputSwitch("status")}>Status</button>
                    <button className="tab" onClick={ () =>handleInputSwitch("post")}>Post</button>
                    {(inputType === 'status')
                    ? <StatusInput currentUserId = {currentUserId}></StatusInput>
                    : <PostSubmitForm></PostSubmitForm> 
                    }
                </div>
    
                /// JUST TAKE ME TO THE FULL POST CREATION FORM REEEEEEEEEEE
            );
} 
    
export default HomeInput