import React, { useEffect } from 'react';

function Feed({home, userId, profileOwnerId}) {
    // boolcheck if it's home feed or user feed before fetching
//
//
//
//
    //pass page owner in
    useEffect(() => {
        let token = document.getElementById('csrf-token').getAttribute('content')
    
        
    
        let param, url
        if(home){
            url = new URL('http://localhost:80/api/feed/home')
            param = {query: userId}
        } else{
            url = new URL('http://localhost:80/api/feed/')
            param = {query: profileOwnerId}
        }
        url.search = new URLSearchParams(param).toString();
        
        fetch(url, {
            headers:{'X-CSRF-TOKEN': token,
            'Content-Type':'application/json',
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true },
            method: 'get',
            mode: "same-origin",
            credentials: "same-origin",
        }).then((response) => {
            console.log('response ' + response);
            response.json().then((data) => {
                console.log(data);
                //if array of activity, show, else don't and load other return statement
                return(
                    <div>
                        <h1>No Content to show currently. Try following some people!</h1>
                    </div>
                );
            });
        });
            
      }, []);
      return(
        <div>
            <h1>No Content to show currently. Try following some people!</h1>
        </div>
    )
}  

export default Feed