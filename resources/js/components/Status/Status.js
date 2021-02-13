/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import StatusInput from '../SubmitPages/StatusInput';
import VotingSystem from '../Posts/VotingSystem';
// Feed a statement array into the Statement class as props
function Status({ appendNewStatus, deleteStatus, status, userId, form }) {
    const [replyClicked, setReplyClicked] = useState();

    if (form === 'feed') {
        return (
            <div
                key={status.id}
                className={['bordered', 'statement'].join(' ')}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <VotingSystem
                        classVariable="statusFeed"
                        id={status.id}
                        type="status"
                    />
                    <img
                        style={{
                            height: '64px',
                            width: '64px',
                            objectFit: 'cover',
                            alignSelf: 'center',
                            borderRadius: '50%',
                        }}
                        src={status.pfp_url}
                        alt="statusPfP"
                    />
                </div>
                <div
                    onClick={() => {
                        window.location.replace(
                            `http://localhost:80/user/${status.username}/status/${status.id}`
                        );
                    }}
                    className="bodyAndFooter"
                    style={{ overflowWrap: 'anywhere' }}
                >
                    <div
                        style={{
                            display: 'flex',
                            marginLeft: '2%',
                            marginTop: '1%',
                        }}
                    >
                        <span
                            style={{
                                fontFamily: 'BentonSans',
                                fontSize: '20px',
                                color: '#63727e',
                            }}
                        >
                            {status.username}
                        </span>
                        <span
                            style={{
                                fontFamily: 'BentonSans',
                                marginLeft: '20px',
                                fontSize: '20px',
                                color: '#63727e',
                            }}
                        >
                            {`@${status.username}`}
                        </span>
                    </div>
                    <div style={{ height: '80%' }}>
                        <p
                            style={{
                                textAlign: 'start',
                                marginTop: '1%',
                                marginLeft: '2%',
                                overflowWrap: 'anywhere',
                                fontWeight: '550px',
                                color: 'rbg(0 39 72)',
                            }}
                        >
                            {status.body}
                        </p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '20px',
                            marginLeft: '2%',
                        }}
                    >
                        <h5
                            style={{
                                fontSize: '15px',
                                fontFamily: 'tahoma',
                                color: 'rgb(0 39 72)',
                            }}
                        >
                            {status.replyCount === 1
                                ? `${status.replyCount} reply`
                                : `${status.replyCount} replies`}
                        </h5>
                        <ChatBubbleOutlineRoundedIcon />
                    </div>
                </div>
            </div>
        );
    }
    if (form === 'focus') {
        return (
            <div id="focusedStatus" className="divBackground">
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <img
                            style={{
                                height: '64px',
                                width: '64px',
                                objectFit: 'cover',
                                alignSelf: 'center',
                                borderRadius: '50%',
                            }}
                            src={status.pfp_url}
                            alt="status owner pfp"
                        />
                        <VotingSystem
                            classVariable="statusFocus"
                            id={status.id}
                            type="status"
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginTop: '20px', marginLeft: '20px' }}>
                            <span>{status.username}</span>
                            <span>{`@${status.username}`}</span>
                        </div>
                        <div style={{ marginTop: '40px', marginLeft: '20px' }}>
                            <p style={{ textAlign: 'start' }}>{status.body}</p>
                        </div>
                    </div>
                </div>

                <div className="bodyAndFooter">
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '20px',
                            marginLeft: '9%',
                        }}
                    >
                        {
                            userId === status.user_id && (
                                <DeleteIcon
                                    onClick={() => deleteStatus(status.id)}
                                />
                            ) /* see why there's no delete icon */
                        }
                        {replyClicked && (
                            <StatusInput
                                currentUserId={userId}
                                appendNewStatus={appendNewStatus}
                                isReply
                                parentStatusId={status.id}
                            />
                        )}
                        <span>Share</span>
                        <span onClick={() => setReplyClicked(!replyClicked)}>
                            Reply
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return <div>{form}</div>;
}

export default Status;
