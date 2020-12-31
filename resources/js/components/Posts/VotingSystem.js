import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import React, {useState, useEffect} from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

    function VotingSystem({userId, id, type}){

        const [upvoted, setUpvoted] = useState(null)
        const [downvoted, setDownvoted] = useState(null)
        function vote(targetId, upvoted, downvoted){
            //make this call once and pass the userID probably from a higher-order component
            let token = document.getElementById('csrf-token').getAttribute('content')
            var url = new URL('http://localhost:80/api/engagement')
            fetch(url, {
                headers:{ 'X-CSRF-TOKEN': token, 'Content-Type':'application/json', "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true},
                method: 'put',
                mode: "cors",
                credentials: "same-origin",
                body: JSON.stringify({
                    userId : userId,
                    targetId: targetId,
                    upvoted: upvoted,
                    downvoted: downvoted,
                    type, type
                })
            }).then((response) => {
                response.json().then((data) => {
                    setUpvoted(data['upvoted']);
                    setDownvoted(data['downvoted'])
                })
            })
        }
        useEffect(() => {
            let token = document.getElementById('csrf-token').getAttribute('content')
            let url = new URL('http://localhost:80/api/engagement')
            let param = {userId: userId, targetId:id, type: type}
            url.search = new URLSearchParams(param).toString();
            fetch(url, {
                headers:{ 'X-CSRF-TOKEN': token, 'Content-Type':'application/json', "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true},
                method: 'get',
                mode: "cors",
                credentials: "same-origin",
                }).then((response) => {
                    response.json().then((data) => {
                        setUpvoted(data['upvoted']);
                        setDownvoted(data['downvoted']);
                    })
                })
        },[]);
        return(
            <div>
                <div style= {{height: '100px'}}>
                    <ArrowDropUpIcon 
                    className="material-icons" 
                    fontSize="large" 
                    style = {{color:  upvoted ? "orange" : null}}
                    onClick = {() => {vote(id, true, false)}}

                     ></ArrowDropUpIcon>
                    <p>number</p>
                    <ArrowDropDownIcon className="material-icons" fontSize="large" style = {{color: downvoted? "blue" : null }} onClick = {() => {vote(id, false, true)}} ></ArrowDropDownIcon>
                </div>
            </div>
        )
    }

export default VotingSystem;