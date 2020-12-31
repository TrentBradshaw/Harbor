import React, { useEffect, useState } from 'react';
import Status from '../Status/Status'

function Feed({home, userId, profileOwnerId, statusArray}) {
    console.log(statusArray + 'statusarray')
    if (!statusArray){
        return(
            <div>
                <h1>No Content to show currently.</h1>
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