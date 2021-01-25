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
            <div className='labelDiv'
            style={{
                display: 'flex',
                backgroundColor: 'rgb(92, 139, 196)',
                
                height: '50px',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <h3 style={{
                    color: 'white', borderRadius:'5px 5px 0px 0px',
                    width: '50%',
                    height: '50px',
                    paddingTop: '35px',
                    marginLeft: '2%',
                }}>Dock Title</h3>
                <div style={{width: '50%', height: '50px'}}></div>
            </div>
            
            <input className='thinInput' value= {name} onChange={ (e)=>handleInputChange(e,'name')}></input>
            <div
            className='labelDiv'
            style={{
                display: 'flex',
                backgroundColor: 'rgb(92, 139, 196)',
                
                height: '50px',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <h3 style={{
                    color: 'white', borderRadius:'5px 5px 0px 0px',
                    width: '50%',
                    height: '50px',
                    paddingTop: '35px',
                    marginLeft: '2%',
                }}>Description</h3>
                <div style={{width: '50%', height: '50px'}}></div>
            </div>
            <input className='mediumInput' value= {description} onChange={(e)=> handleInputChange(e,'description')}></input>
            <button className = 'creationButton' style={{alignSelf: 'flex-end'}} onClick={(e) => handleClick(e)}>Create Dock</button>
        </div>
    )
}  

export default DockSubmitForm