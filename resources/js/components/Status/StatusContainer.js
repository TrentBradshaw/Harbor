import { divide, toArray } from 'lodash';
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Status from './Status'

//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
function StatusContainer({statusId}) {
  
    const [isLoading, setLoading] = useState(true);
    const [repliesArray, setRepliesArray] = useState();
    const [mainStatus, setMainStatus] = useState();
 
    useEffect(() => {
        
        let url = new URL('http://localhost:80/api/statuses')
        let param = {query: statusId}
        url.search = new URLSearchParams(param).toString();
        fetch(url, {
            headers:{
                'X-CSRF-TOKEN': document.getElementById('csrf-token').getAttribute('content'),'Content-Type':'application/json',
                "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true 
            },
            method: 'get',
            mode: "cors",
            credentials: "same-origin",
            }).then((response) => {
                response.json().then((data) => {
                    console.log(data)
                    setRepliesArray(data['replies']);
                    setMainStatus(data['status']);
                    setLoading(false);
                });
            })
    }, []);
    function appendNewStatus(commentObject, isReply, parentStatusId){
        let tempCommentsArray = [...repliesArray]; 
        let index;
        if (isReply){
            for (let i = 0; i < tempCommentsArray.length; i++) {
                if(tempCommentsArray[i]['id'] === parentStatusId){
                    console.log('i: ' + i)
                  index = i + 1;
                  console.log('index: ' + index)
                }
            }
            tempCommentsArray.splice(index,0, commentObject)
            console.log(tempCommentsArray)
            setRepliesArray(tempCommentsArray)
        }else{
            tempCommentsArray.unshift(commentObject)
            console.log(tempCommentsArray)
            setRepliesArray(tempCommentsArray)
        }
    }
    function deleteStatus(){
        //if the comment is deleted and a parrent then just update the properties to say deleted comment
        let token = document.getElementById('csrf-token').getAttribute('content')
        //ADD THE FETCH
        fetch('/api/comments/delete', {
            headers:{'X-CSRF-TOKEN': token, 'Content-Type':'application/json',},
            method: 'put',
            mode: "same-origin",
            credentials: "same-origin",
            body: JSON.stringify({id: id})
        }).then(
            data => { 
                console.log('data from commentinput----------------------' + JSON.stringify(data))
                /*
                let tempCommentsArray = [...commentsArray]; 
                let index;
                for (let i = 0; i < tempCommentsArray.length; i++) {
                    if(tempCommentsArray[i]['id'] === id){
                        console.log('id: '+ id)
                        console.log('commentId: ' + tempCommentsArray[i]['id'])
                        console.log('i: ' + i)
                    index = i;
                    console.log('index: ' + index)
                    }
                
                tempCommentsArray.splice(index,1)
                console.log(tempCommentsArray)
                changeCommentsArray(tempCommentsArray)
                
                } */
            })
    }
        if(!isLoading){
            return(
                <div id='statusShowcase'>
                    <Status appendNewStatus = {appendNewStatus} deleteStatus={deleteStatus} status ={mainStatus} userId={mainStatus.user_id} form={'focus'}></Status>
                    {repliesArray.map((element)=>(
                    <Status key = {element.id} userId = {userId} deleteStatus ={deleteStatus} appendNewStatus ={appendNewStatus} status = {element} form={'feed'}></Status>
                    
                    ))}
                </div>
            
            )
        }
        else{
            return(<div>meme</div>)
        }
       
        
    
}  

if (document.getElementById('statusContainer')) {
    let statusId = document.getElementById('dataHolder').getAttribute('statusId');
   ReactDOM.render(<StatusContainer statusId={statusId} />, document.getElementById('statusContainer')); //figure out what this data will be
}