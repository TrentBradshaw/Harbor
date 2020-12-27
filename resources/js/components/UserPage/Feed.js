import React, { useEffect, useState } from 'react';
import Status from '../Status/Status'

function Feed({home, userId, profileOwnerId, statusArray}) {
   
    







//figure out why appendNewStatus isn't working//


////
///

////












    
    
    if (statusArray === []){
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
                    <Status userId = {userId} key = {element.id} status = {element}></Status>
                    ))
                }
                </div>
            </div>
        );
    }
}  

export default Feed