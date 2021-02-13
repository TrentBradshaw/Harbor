import React, { useState } from 'react';
import PostSubmitForm from '../SubmitPages/PostSubmitForm';
import StatusInput from '../SubmitPages/StatusInput';

// SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function HomeInput({ currentUserId, appendNewStatus }) {
    const [inputType, changeInputType] = useState('status');

    function handleInputSwitch(inputTypeTemp) {
        changeInputType(inputTypeTemp);
    }
    return (
        <div id="homeInput">
            <div style={{ display: 'flex' }}>
                <button
                    type="button"
                    className="tab"
                    onClick={() => handleInputSwitch('status')}
                >
                    Status
                </button>
                <button
                    type="button"
                    style={{ borderLeft: ' 1px solid white' }}
                    className="tab"
                    onClick={() => handleInputSwitch('post')}
                >
                    Post
                </button>
            </div>

            {inputType === 'status' ? (
                <StatusInput
                    currentUserId={currentUserId}
                    appendNewStatus={appendNewStatus}
                />
            ) : (
                <PostSubmitForm />
            )}
        </div>

        /// JUST TAKE ME TO THE FULL POST CREATION FORM REEEEEEEEEEE
    );
}

export default HomeInput;
