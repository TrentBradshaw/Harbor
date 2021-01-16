import { toArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import ExploreIcon from '@material-ui/icons/Explore';
import ProfileDropDownMenu from '../DropdownProfileMenu/ProfileDropDownMenu'
import DockDropDownMenu from '../DropdownDockMenu/DockDropDownMenu'
import Loading from '../Utility/Loading';
import PostSubmitForm from '../SubmitPages/PostSubmitForm'
import StatusInput from '../SubmitPages/StatusInput'
import DockSubmitForm from '../DockSubmitForm'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";


  import HomeSharpIcon from '@material-ui/icons/HomeSharp';
  import ListSharpIcon from '@material-ui/icons/ListSharp';
  import NotificationsNoneSharpIcon from '@material-ui/icons/NotificationsNoneSharp';
  import ExploreSharpIcon from '@material-ui/icons/ExploreSharp';
  import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
  import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
  import CreateSharpIcon from '@material-ui/icons/CreateSharp';
  import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';
  import PersonSharpIcon from '@material-ui/icons/PersonSharp';



function Header() {
    const [userData, setUserData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [popUpclicked, setPopUpClicked] = useState(false)
    const [communityPopUpActive, setCommunityPopUpActive] = useState(false)
    const [postPopUpActive, setPostPopUpActive] = useState(false)
    const [statusPopUpActive, setStatusPopUpActive] = useState(false)
 
    useEffect(() => {
        fetch('http://localhost:80/api/userdetails', {
        headers:{
            'X-CSRF-TOKEN': document.getElementById('csrf-token').getAttribute('content'),
            'Content-Type':'application/json',
        },
        method: 'get',
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

    function activateSubMenu(menu){
        setPopUpClicked(true)
        switch (menu) {
            case 'community':
                setCommunityPopUpActive(true);    
                break;
            case 'post':
                setPostPopUpActive(true);
                break;
            case 'status':
                setStatusPopUpActive(true);
                break;
            default:
                break;
        }
    }

    function popUpBackdropClicked(){
        setPopUpClicked(false)
        setCommunityPopUpActive(false)
        setPostPopUpActive(false)
        setStatusPopUpActive(false)
    }

    if(isLoading)
        return(<Loading></Loading>)

    return(
        <div style={{width: '15%'}}>
<div id = 'header' className={['bordered', 'divBackground'].join(" ")} style={{display:'flex', flexDirection: 'column', width:'300px', height: '500px'
        ,position: 'fixed', left: '9%'}}>
                {popUpclicked && <div onClick = {() =>popUpBackdropClicked()} id='popUpBackdrop'></div>}
                {communityPopUpActive && <DockSubmitForm></DockSubmitForm>}
                {postPopUpActive && <PostSubmitForm></PostSubmitForm>}
                {statusPopUpActive && <StatusInput appendNewStatus={null} isReply = {false} parentStatusId = {null}></StatusInput>}
                <div className={['divHeader'].join(" ")}>
                    <h1 className='headerText' >Harbor</h1>
                </div>
                <nav className ='divBackground' id='headerNav' style={{display:'flex', flexDirection: 'column', alignItems:'start'}}>
                    <Link className = 'headerItem' to="/home">
                        <HomeSharpIcon></HomeSharpIcon>
                        <span className='inherentFont'>Home</span>
                    </Link>
                    <Link className = 'headerItem' to="/subscriptions">
                        <ListSharpIcon></ListSharpIcon>
                        <span className='inherentFont'>Subscriptions</span>
                        
                    </Link>
                    <Link className= 'headerItem' to='/notifications' >
                        <NotificationsNoneSharpIcon></NotificationsNoneSharpIcon>
                        <span className='inherentFont'>Notifications</span>
                        
                    </Link>
                    <Link className= 'headerItem' to='http://localhost/explore'>
                        <ExploreSharpIcon></ExploreSharpIcon>
                        <span className='inherentFont'>Explore</span>
                        
                    </Link>
                    <div onClick ={()=>activateSubMenu('community')} className= 'headerItem' href={'http://localhost/submit/dock'}>
                        <AddBoxSharpIcon></AddBoxSharpIcon>
                        <span className='inherentFont'>Create Community</span>
                        
                    </div>
                    <div onClick ={()=>activateSubMenu('post')} className= 'headerItem' href={'http://localhost/submit/post'}>
                        <AddCircleOutlineSharpIcon></AddCircleOutlineSharpIcon>
                        <span className='inherentFont'>Create Post</span>
                        
                    </div>
                    <div onClick ={()=>activateSubMenu('status')} className= 'headerItem' href={'http://localhost/submit/status'}>
                        <CreateSharpIcon></CreateSharpIcon>
                        <span className='inherentFont'>Create Status</span>
                        
                    </div>
                    <Link className= 'headerItem' to='/settings' >
                        <SettingsSharpIcon></SettingsSharpIcon>
                        <span className='inherentFont'>Settings</span>
                        
                    </Link>
                    <Link className= 'headerItem' to={'/user/' + userData.username }>
                        <PersonSharpIcon></PersonSharpIcon>
                        <span className='inherentFont'>Profile</span>
                        
                    </Link>
                </nav>
               
                {/*
                    <nav id='headerNav' style={{display:'flex', flexDirection: 'column', alignItems:'start'}}>
                    <a className= 'headerItem' href='http://localhost/home'>Home</a>
                    <a className= 'headerItem' href='http://localhost/notification' >Notifications</a>
                    <a className= 'headerItem' href={'http://localhost/following/' + userData.username}>Following</a>
                    <a className= 'headerItem' href={'http://localhost/submit/dock'}>Create Community</a>
                    <a className= 'headerItem' href={'http://localhost/submit/post'}>Create Post</a>
                    <a className= 'headerItem' href={'http://localhost/submit/status'}>Create Status</a>
                    <a className= 'headerItem' href='http://localhost/settings' >Settings</a>
                    <a className= 'headerItem' href={'http://localhost/user/' + userData.username }>Profile</a>
                    </nav>
                */}
        </div>
        </div>
        
    )
}  

if (document.getElementById('Header')) {
   var data = document.getElementById('dataHolder').getAttribute('data');
   var currentUser = document.getElementById('dataHolder').getAttribute('currentUser')
   ReactDOM.render(<Header data={data}/>, document.getElementById('Header'));
}
export default Header;