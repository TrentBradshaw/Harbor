import React, { useEffect, useState } from 'react';
import Status from '../Status/Status'

function Feed({home, userId, profileOwnerId, }) {
    const [statusArray, changeStatusArray] = useState([]);
    const [isLoading, setLoading] = useState(true);
    







//figure out why appendNewStatus isn't working//


////
///

////

/










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
        console.log(url)
        fetch(url, {headers:{'X-CSRF-TOKEN': token, 'Content-Type':'application/json', "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true },
            method: 'get',
            mode: "same-origin",
            credentials: "same-origin",
        }).then((response) => {
            console.log('response ' + response);
            response.json().then((data) => {
                console.log(data);
                setLoading(false)
                changeStatusArray(data['statuses'])
            });
        });
    },[]);
    function appendNewStatus(statusObject){
        let tempStatusArray = [...statusArray]; 
        tempStatusArray.unshift(statusObject)
        console.log(tempStatusArray)
        changeCommentsArray(tempStatusArray)
    }
    function deleteStatus(id){
        let token = document.getElementById('csrf-token').getAttribute('content')
        fetch('/api/status/delete', {
            headers:{'X-CSRF-TOKEN': token, 'Content-Type':'application/json',},
            method: 'delete',
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({id: id})
        }).then(
            data => { 
                console.log('data from commentinput----------------------' + JSON.stringify(data))
                let tempStatusArray = [...statusArray]; 
                let index;
                for (let i = 0; i < tempStatusArray.length; i++) {
                    if(tempStatusArray[i]['id'] === id){
                    index = i
                    console.log('index: ' + index)
                    }
                }
                tempStatusArray.splice(index,1)
                console.log(tempStatusArray)
                changeCommentsArray(tempStatusArray)
            }
        )
    }

    if (isLoading) { return <div className="App">Loading...</div> }
    else if (statusArray === []){
        return(
            <div>
                <h1>No Content to show currently. Try following some people!</h1>
            </div>
        );
    } else{
        return (
            <div>
                <div id = "commentsholder">
                {
                    statusArray.map((element)=>(
                    <Status userId = {userId} key = {element.id} deleteStatus = {deleteStatus} appendNewStatus = {appendNewStatus} status = {element}></Status>
                    ))
                }
                </div>
            </div>
        );
    }
}  

export default Feed