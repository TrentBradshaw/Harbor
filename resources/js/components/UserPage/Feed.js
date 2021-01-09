import React, { useEffect, useState } from 'react';
import Status from '../Status/Status'

function Feed({home, currentUserId, profileOwnerId, appendNewStatus, deleteStatus, feedArray}) {
    console.log(feedArray + 'feedarray')
    if(feedArray){
        return (
            <div>
                <div id = "commentsholder">
                {   //feed this an array of posts as well, then mix them, then sort them in chronilogical order
                    feedArray.map((element)=>(
                        <Status 
                        key = {element.id} 
                        userId = {currentUserId} 
                        deleteStatus ={deleteStatus} 
                        appendNewStatus ={appendNewStatus} 
                        status = {element}
                        form='feed'
                        ></Status>
                    ))
                }
                </div>
            </div>
        ); 
    }
    else{return(<div></div>)}
}  

export default Feed