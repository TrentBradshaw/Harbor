
import React, { useState, useEffect } from 'react';

function TextPost(props) {
    console.log('dabbie')
    console.log(JSON.stringify(props) + ' from Textpost')
    return (
        <div style={{width: '100%'}} >     
            <div>
                <p style ={{  marginLeft: '10px',
                              marginTop: '10px',
                              alignContent: 'start',
                              minHeight: '100px',  
                              display: "inline-block", 
                              width: '100%'}} >{props.state.text}</p>
            </div>
        </div>
    );
}
export default TextPost;