import React, { useEffect } from 'react';

function UserPageFeed({pageOwnerId}) {
    // boolcheck if it's home feed or user feed before fetching
//
//
//
//
    //pass page owner in
    useEffect(() => {
        let url = new URL('http://localhost:80/api/feed')
        let param = {query: pageOwnerId}

        url.search = new URLSearchParams(param).toString();
        
        fetch(url, {
            headers:{
                'Content-Type':'application/json',
            },
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

export default UserPageFeed