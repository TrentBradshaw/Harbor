import React, { useState, useEffect } from 'react';
//make this more secure by handling the following/follow more nuanced
//switch to hooks down the road
function FollowButton({followeeUsername}){
    
    const [isFollowingText, setIsFollowingText] = useState('')
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    
    function figureOutIfFollowingOrNot(){
        let token = document.getElementById('csrf-token').getAttribute('content')
        let url = new URL('http://localhost:80/api/followers')
        let param = {followee: followeeUsername}
        url.search = new URLSearchParams(param).toString();
        fetch(url, {
            headers:{ 'X-CSRF-TOKEN': token, 'Content-Type':'application/json', "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true},
            method: 'get',
            mode: "cors",
            credentials: "same-origin",
            }).then((response) => {
                response.json().then((data) => {
                    console.log(data['following'])
                    setIsFollowing(data['following']);
                    setIsLoading(false)
                    console.log(isFollowing + ' isfollowing')
                    data['following'] ? setIsFollowingText('Following'): setIsFollowingText('Follow')
                })
            })
    }
    useEffect(() => {
        figureOutIfFollowingOrNot();   
      }, []);
      console.log(isFollowingText['isFollowingText'] + ' ift')

    function submit(){
        let method;
        if(isFollowing)
        {
            method = 'delete'
            setIsFollowingText('Follow');
            setIsFollowing(false);
        }
        else{
            method = 'post'
            setIsFollowingText('Following');
            setIsFollowing(true);
        }
        let token = document.getElementById('csrf-token').getAttribute('content')
        fetch('/api/followers', {
            headers:{'X-CSRF-TOKEN': token, 'Content-Type':'application/json',},
            method: method,
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({
                followee: followeeUsername,
            })
        })
    } 
    if(isLoading){
        return(<div>Loading</div>)
    }
    return(
        <button onClick={ () => submit()}>{isFollowingText}</button>
    )
}  

export default FollowButton