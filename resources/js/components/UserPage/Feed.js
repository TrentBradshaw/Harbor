import React, { useEffect, useState } from 'react';
import Status from '../Status/Status'

function Feed({home, userId, profileOwnerId, appendNewStatus, deleteStatus, feedArray}) {
    console.log(statusArray + 'statusarray')
    if(home){
        if (!feedArray){
            return(
                <div>
                    <h1>No Content to show currently.</h1>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div id = "commentsholder">
                    {   //feed this an array of posts as well, then mix them, then sort them in chronilogical order
                        feedArray.map((element)=>(
                        <Status key = {element.id} userId = {userId} deleteStatus ={deleteStatus} appendNewStatus ={appendNewStatus} status = {element}></Status>
                        
                        ))
                    }
                    </div>
                </div>
            ); 
        }
        
    }
     else{
        return (
            <div>
                <div id = "commentsholder">
                {   //feed this an array of posts as well, then mix them, then sort them in chronilogical order
                    feedArray.map((element)=>(
                    <Status key = {element.id} userId = {userId} deleteStatus ={deleteStatus} appendNewStatus ={appendNewStatus} status = {element}></Status>
                    
                    ))
                }
                </div>
            </div>
        );
    }
}  

export default Feed