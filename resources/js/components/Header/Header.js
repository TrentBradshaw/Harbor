import { toArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import ExploreIcon from '@material-ui/icons/Explore';
import ProfileDropDownMenu from '../DropdownProfileMenu/ProfileDropDownMenu'
import DockDropDownMenu from '../DropdownDockMenu/DockDropDownMenu'
import Loading from '../Utility/Loading';


function Header() {
    const [userData, setUserData] = useState([]);
    const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {

        let token = document.getElementById('csrf-token').getAttribute('content')
        fetch('http://localhost:80/api/userdetails', {
        headers:{
            'X-CSRF-TOKEN': token,
            'Content-Type':'application/json',
        },
        method: 'post',
        mode: "same-origin",
        credentials: "same-origin",
        }).then((response) => {
            console.log(response)
            response.json().then((data) => {
                console.log(data);
                setUserData(data)
                setLoading(false);
            });
        })
            
      }, []);
    if(isLoading)
        return(<Loading></Loading>)
    return (
        <div style={{  flex: '1 0 auto' , padding: '1px 0px', display: "inline-flex", width: '100%', height: '100%'}}>
            <div id='userId' data={userData.id}></div>
            <div style={{flex: '1', flex: '1 0 auto'}}>
                <h1 onClick={() => { window.location.href = '/home' }}>ROLLER</h1>
            </div>
            <DockDropDownMenu></DockDropDownMenu>
            <div className="header__search" style={{flex: '5'}}>
                <input type='text' className='header__searchInput'></input>
                <SearchIcon className="header__searchIcon" />
            </div>
            <div style={{ justifyContent: 'center', display: 'flex', flex: '1', flex: '1 0 auto'}}>
                <div onClick={() => { window.location.href = '/submit' }}>
                    <AddIcon className="header__searchIcon" />
                </div>
                <div>
                    <ExploreIcon className="header__searchIcon" />
                </div>
                <button onClick={() => { window.location.href = '/logout' }}>Logout</button>
            </div>
            <ProfileDropDownMenu currentUserId ={userData.id} currentUserUsername ={userData.username}></ProfileDropDownMenu>
        </div>   
    ); 
}  

if (document.getElementById('Header')) {
   var data = document.getElementById('dataHolder').getAttribute('data');
   var currentUser = document.getElementById('dataHolder').getAttribute('currentUser')
   ReactDOM.render(<Header data={data}/>, document.getElementById('Header'));
}