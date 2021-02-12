import React, { useState, useEffect } from 'react';
import CommentInput from './CommentInput';
import PostComment from './PostComment';
// don't forget to pass the votes into the voting system component

const PostComments = ({ userId, parentPostId }) => {
    const [isLoading, changeLoading] = useState(true);
    const [commentsArray, changeCommentsArray] = useState([]);
    const fetchData = () => {
        const url = new URL('http://localhost:80/api/comments');
        const param = { query: parentPostId };

        url.search = new URLSearchParams(param).toString();
        fetch(url, {
            headers: {
                'X-CSRF-TOKEN': document
                    .getElementById('csrf-token')
                    .getAttribute('content'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            method: 'get',
            mode: 'cors',
            credentials: 'same-origin',
        }).then((response) => {
            response.json().then((data) => {
                console.log(
                    `Data ------------------------${JSON.stringify(data)}`
                );
                changeLoading(false);
                changeCommentsArray(data.comments);
            });
        });
    };
    useEffect(() => {
        fetchData();
    }, []);

    function appendNewComment(commentObject, isReply, parentCommentId) {
        const tempCommentsArray = [...commentsArray];
        let index;
        if (isReply) {
            for (let i = 0; i < tempCommentsArray.length; i += 1) {
                if (tempCommentsArray[i].id === parentCommentId) {
                    console.log(`i: ${i}`);
                    index = i + 1;
                    console.log(`index: ${index}`);
                }
            }
            tempCommentsArray.splice(index, 0, commentObject);
            console.log(tempCommentsArray);
            changeCommentsArray(tempCommentsArray);
        } else {
            tempCommentsArray.unshift(commentObject);
            console.log(tempCommentsArray);
            changeCommentsArray(tempCommentsArray);
        }
    }
    function deleteComment(id) {
        // if the comment is deleted and a parrent then just update the properties to say deleted comment
        const token = document
            .getElementById('csrf-token')
            .getAttribute('content');
        // ADD THE FETCH
        fetch('/api/comments/delete', {
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
            method: 'put',
            mode: 'same-origin',
            credentials: 'same-origin',
            body: JSON.stringify({ id: id }),
        }).then((data) => {
            console.log(
                `data from commentinput----------------------${JSON.stringify(
                    data
                )}`
            );
        });
    }
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    return (
        <div style={{ marginTop: '20px' }}>
            <hr style={{ marginBottom: '20px' }} />
            <div
                style={{ marginTop: '20px', marginLeft: ' 6.5%', width: '80%' }}
            >
                <CommentInput
                    style={{ height: '120px' }}
                    isReply={false}
                    parentComment={null}
                    appendNewComment={appendNewComment}
                    parentPostId={parentPostId}
                >
                    hideInput={null}
                </CommentInput>
            </div>

            <div id="commentsholder">
                {commentsArray.map((element) => (
                    <PostComment
                        key={element.id}
                        userId={userId}
                        deleteComment={deleteComment}
                        appendNewComment={appendNewComment}
                        comment={element}
                    />
                ))}
            </div>
        </div>
    );
};

export default PostComments;
