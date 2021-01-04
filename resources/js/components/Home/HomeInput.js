
import React, { useState } from 'react';
import ImageIcon from '@material-ui/icons/Image';
import PostSubmitForm from '../SubmitPages/PostSubmitForm'
import StatusInput from '../SubmitPages/StatusInput'

//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function HomeInput({currentUserId ,profileOwnerInfo,appendNewStatus}) {
    const [inputType, changeInputType] = useState('status');
    
    function handleInputSwitch(inputType){
        changeInputType(inputType)
    }
            return (
                <div id="homeInput">
                    <div style={{display:'flex'}}>
                        <button className="tab" onClick={ () =>handleInputSwitch("status")}>Status</button>
                        <button style= {{borderLeft: ' 1px solid white'}} className="tab" onClick={ () =>handleInputSwitch("post")}>Post</button>
                    </div>
                        
                        {(inputType === 'status')
                        ? <StatusInput currentUserId = {currentUserId} appendNewStatus={appendNewStatus}></StatusInput>
                        : <PostSubmitForm></PostSubmitForm> 
                        }
                    </div>
    
                /// JUST TAKE ME TO THE FULL POST CREATION FORM REEEEEEEEEEE
            );
} 
    
export default HomeInput