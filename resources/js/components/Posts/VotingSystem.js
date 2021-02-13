import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import React, { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function VotingSystem({ classVariable, id, type }) {
    const [upvoted, setUpvoted] = useState(null);
    const [downvoted, setDownvoted] = useState(null);
    const [score, setScore] = useState();
    const [isLoading, setLoading] = useState(true);

    function vote(targetId, choseUpvoted, choseDownvoted) {
        // make this call once and pass the userID probably from a higher-order component
        const token = document
            .getElementById('csrf-token')
            .getAttribute('content');
        const url = new URL('http://localhost:80/api/engagement');
        fetch(url, {
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            method: 'put',
            mode: 'cors',
            credentials: 'same-origin',
            body: JSON.stringify({
                targetId: targetId,
                choseUpvoted: choseUpvoted,
                choseDownvoted: choseDownvoted,
                type,
            }),
        }).then(() => {
            if (upvoted) {
                if (choseUpvoted) {
                    setUpvoted(false);
                    setScore(score - 1);
                } else {
                    setUpvoted(false);
                    setDownvoted(true);
                    setScore(score - 2);
                }
            } else if (downvoted) {
                if (choseDownvoted) {
                    setDownvoted(false);
                    setScore(score + 1);
                } else {
                    setDownvoted(false);
                    setUpvoted(true);
                    setScore(score + 2);
                }
            } else {
                setUpvoted(choseUpvoted);
                setDownvoted(choseDownvoted);
                if (choseDownvoted) setScore(score - 1);
                else setScore(score + 1);
            }
            setLoading(false);
        });
    }
    useEffect(() => {
        const url = new URL('http://localhost:80/api/engagement');
        const param = { targetId: id, type: type };
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
        })
            .then((response) => response.json())
            .then((data) => {
                setUpvoted(data.upvoted);
                setDownvoted(data.downvoted);
                setScore(data.score);
                setLoading(false);
            });
    }, []);
    if (isLoading) return <></>;
    return (
        <div>
            <div>
                <ArrowDropUpIcon
                    className={classVariable}
                    style={{
                        fontSize: '50px',
                        color: upvoted ? 'orange' : null,
                    }}
                    onClick={() => {
                        vote(id, true, false);
                    }}
                />
                <p style={{ textAlign: 'center' }}>{score}</p>
                <ArrowDropDownIcon
                    className={classVariable}
                    style={{
                        fontSize: '50px',
                        color: downvoted ? 'blue' : null,
                    }}
                    onClick={() => {
                        vote(id, false, true);
                    }}
                />
            </div>
        </div>
    );
}

export default VotingSystem;
