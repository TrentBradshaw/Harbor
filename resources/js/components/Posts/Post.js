import React, { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from 'react-router-dom';
import LinkedPost from './LinkedPost';
import TextPost from './TextPost';
import VotingSystem from './VotingSystem';
import Moment from '../Utility/Moment';
import MediaPost from './MediaPost';
import PostComments from '../Comments/PostComments';

function GetPostType(type, state) {
    if (type === 'link') {
        return <LinkedPost state={state} />;
    }
    if (type === 'text') {
        return <TextPost state={state} />;
    }
    if (type === 'media') {
        return <MediaPost state={state} />;
    }
}

function Post() {
    const [isLoading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [state, setNewState] = useState({
        communityTitle: '',
        created_at: '',
        creatorUsername: '',
        text: '',
        media_url: '',
        title: '',
        link: '',
        type: '',
        currentUTCTime: '',
    });
    const { postId } = useParams();
    const fetchData = () => {
        const token = document
            .getElementById('csrf-token')
            .getAttribute('content');
        fetch('https://harborsms.herokuapp.com/userdetails', {
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            method: 'get',
            mode: 'cors',
            credentials: 'same-origin',
        }).then((response) => {
            response.json().then((data) => {
                setUserId(data.id);
                console.log(`${data}sffwfgsdgwswsw`);
            });
        });
        const url = new URL('https://harborsms.herokuapp.com/api/post');
        const param = { query: postId };

        url.search = new URLSearchParams(param).toString();
        fetch(url, {
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            method: 'get',
            mode: 'cors',
            credentials: 'same-origin',
        }).then((response) => {
            response.json().then((data) => {
                console.log(data.postInfo);
                setNewState(data.postInfo);
                setLoading(false);
                console.log(`${state} state`);
            });
        });
    };
    useEffect(() => {
        fetchData();
    }, []);

    function handleDeletePost() {
        fetch('https://harborsms.herokuapp.com/api/post', {
            headers: {
                'X-CSRF-TOKEN': document
                    .getElementById('csrf-token')
                    .getAttribute('content'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            method: 'delete',
            mode: 'cors',
            credentials: 'same-origin',
            body: JSON.stringify({
                postId: state.id,
            }),
        }).then((response) => {
            response.json().then((data) => {
                console.log(data);
                window.location.replace(
                    `https://harborsms.herokuapp.com/dock/${state.communityTitle}`
                );
            });
        });
    }
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div
            className={['leftBorder', 'rightBorder', 'baseMainContainer'].join(
                ' '
            )}
        >
            <div
                className="App"
                style={{
                    marginLeft: '2%',
                    marginRight: '2%',
                    minHeight: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div
                    id="PostHeader"
                    style={{ width: '70%', backgroundColor: 'white' }}
                >
                    <div style={{ display: 'flex' }} id="RealPostHeader">
                        <VotingSystem id={postId} type="post" />
                        <img
                            style={{
                                height: '64px',
                                width: '64px',
                                overflow: 'hidden',
                                objectFit: 'cover',
                            }}
                            src={state.posterPfpUrl}
                            alt="pfp"
                        />
                        <div id="2" style={{ width: '100%' }}>
                            <h2>{state.title}</h2>
                            <div style={{ display: 'flex' }}>
                                <Moment
                                    creator={state.creatorUsername}
                                    timePosted={state.formattedStamp}
                                />
                                <p>{`${state.commentCount} comments`}</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const Url = `https://harborsms.herokuapp.com/dock/${state.communityTitle}/${state.id}/${state.title}`;
                                        const dummy = document.createElement(
                                            'textarea'
                                        );
                                        dummy.style.display = 'none';
                                        document.body.appendChild(dummy);
                                        dummy.value = Url;
                                        dummy.select();
                                        document.execCommand('copy');
                                        document.body.removeChild(dummy);
                                    }}
                                >
                                    share
                                </button>
                                {userId === state.creator_id && (
                                    <DeleteIcon
                                        onClick={() => handleDeletePost()}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        {GetPostType(state.type, state)}
                    </div>

                    <div>
                        <div>
                            <PostComments
                                userId={userId}
                                parentPostId={state.id}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ width: '20%', minHeight: '100%' }}>
                    <div>
                        <h1>Sidebar</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Post;
