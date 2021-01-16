import React, { useEffect, useState } from 'react';

function SubscriptionObject({feedItem}) {
    

//HERE YOU'RE gonna wanna make the object a different thing depending on the type





















        return (
            <div onClick={()=>{window.location.replace( feedItem.url)}} 
            key={status.id} 
            className = 'statement' 
            style={{borderColor: 'rgb(56, 68, 77)', border: '1px solid'}}>
                <div style={{display: 'flex', alignItems:'center'}}>
                    <img style={{height: '32px', width:'32px', objectFit: 'cover', alignSelf: 'center', borderRadius: '50%'}} src={feedItem.pfp_url}></img>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <span>{feedItem.username}</span>
                    </div>
                </div>
                <div className= "bodyAndFooter">
                    <div style= {{    height: '80%'}}>
                        <p style={{textAlign:'start', marginLeft:'9%'}}>{feedItem.description}</p> 
                    </div>
                </div>
            </div>
        ); 
}  

export default SubscriptionObject