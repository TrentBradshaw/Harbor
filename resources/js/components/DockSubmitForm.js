import React, { useState } from 'react';

function DockSubmitForm() {
  
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    function handleInputChange(event, type){ 
        if(type=='name')
            setName(event.target.value)
        else if(type=='description')
            setDescription(event.target.value)
    }
    
    function handleClick(){
        fetch('http://localhost:80/api/docks/submit', {
        headers:{'X-CSRF-TOKEN': document.getElementById('csrf-token').getAttribute('content'),'Content-Type':'application/json',},
        method: 'post',
        mode: "same-origin",
        credentials: "same-origin",
        body: JSON.stringify({dockTitle:name,dockDescription:description,})
        }).then((response) => {
            response.json().then((data) => {
                if (data['dock_added'])
                    window.location.href = 'http://localhost:80/dock/' + data['dock_url_title'];
            });
        })
    }
    return(
        <div style= {{display:'flex', flexDirection: 'column', backgroundColor: 'white'}} className = 'headerSubmitForm'>
            <h2 style={{backgroundColor: '#5c8bc4'}}>Create a Dock</h2>
            <hr></hr>
            <h2 style={{backgroundColor: '#5c8bc4'}}>Name of Dock</h2>
            <input className='thinInput' value= {name} onChange={ (e)=>handleInputChange(e,'name')}></input>
            <h2 style={{backgroundColor: '#5c8bc4'}}>Description</h2>
            <input className='mediumInput' value= {description} onChange={(e)=> handleInputChange(e,'description')}></input>
            <hr></hr>
            <button style={{alignSelf: 'flex-end', height:'50px'}} onClick={(e) => handleClick(e)}>Create Dock</button>
        </div>
    )
}  

export default DockSubmitForm