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


function Header() {
    const [userData, setUserData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [popUpclicked, setPopUpClicked] = useState(false)
    const [communityPopUpActive, setCommunityPopUpActive] = useState(false)
    const [postPopUpActive, setPostPopUpActive] = useState(false)
    const [statusPopUpActive, setStatusPopUpActive] = useState(false)
  // Home
  // Explore
  // Notifications
  // Following
  // Profile
  // Settings
    useEffect(() => {

        let token = document.getElementById('csrf-token').getAttribute('content')
        fetch('http://localhost:80/api/userdetails', {
        headers:{
            'X-CSRF-TOKEN': token,
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
        <div style={{display:'flex', flexDirection: 'column', flexBasis: '20',}}>
                {popUpclicked && <div onClick = {() =>popUpBackdropClicked()} id='popUpBackdrop'></div>}
                {communityPopUpActive && <DockSubmitForm></DockSubmitForm>}
                {postPopUpActive && <PostSubmitForm></PostSubmitForm>}
                {statusPopUpActive && <StatusInput appendNewStatus={null} isReply = {false} parentStatusId = {null}></StatusInput>}
                <h1>Harbor</h1>
                <nav id='headerNav' style={{display:'flex', flexDirection: 'column', alignItems:'start'}}>
                    <a className= 'headerItem' href='http://localhost/home'>Home</a>
                    <a className= 'headerItem' href='http://localhost/notification' >Notifications</a>
                     { /*<a className= 'headerItem' href={'http://localhost/following/' + userData.username}>Following</a>*/}
                    <a className= 'headerItem' href='http://localhost/explore'>Explore</a>
                </nav>
                <div>
                    <div onClick ={()=>activateSubMenu('community')} className= 'headerItem' href={'http://localhost/submit/dock'}>Create Community</div>
                    <div onClick ={()=>activateSubMenu('post')} className= 'headerItem' href={'http://localhost/submit/post'}>Create Post</div>
                    <div onClick ={()=>activateSubMenu('status')} className= 'headerItem' href={'http://localhost/submit/status'}>Create Status</div>
                </div>
                <nav>
                    <a className= 'headerItem' href='http://localhost/settings' >Settings</a>
                    <a className= 'headerItem' href={'http://localhost/user/' + userData.username }>Profile</a>
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
    )
}  

if (document.getElementById('Header')) {
   var data = document.getElementById('dataHolder').getAttribute('data');
   var currentUser = document.getElementById('dataHolder').getAttribute('currentUser')
   ReactDOM.render(<Header data={data}/>, document.getElementById('Header'));
}