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
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

  import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
  import ListRoundedIcon from '@material-ui/icons/ListRounded';
  import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
  import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
  import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
  import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
  import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
  import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
  import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

//

function Header() {
    const [userData, setUserData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [popUpclicked, setPopUpClicked] = useState(false)
    const [communityPopUpActive, setCommunityPopUpActive] = useState(false)
    const [postPopUpActive, setPostPopUpActive] = useState(false)
    const [statusPopUpActive, setStatusPopUpActive] = useState(false)
 
    const useStyles = makeStyles((theme) => ({
        fab: {
          margin: theme.spacing(2),
        },
        absolute: {
          position: 'absolute',
          bottom: theme.spacing(2),
          right: theme.spacing(3),
        },
      }));
      const classes = useStyles();
    useEffect(() => {
        fetch('https://harborsms.herokuapp.com/api/userdetails', {
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
        <div>

        
        
<div id = 'header'
    style={{display:'flex', width:'100%',position: 'fixed', left: '0px', top: '0px',height :'40px'}}>
                {popUpclicked && <div onClick = {() =>popUpBackdropClicked()} id='popUpBackdrop'></div>}
                {communityPopUpActive && <DockSubmitForm></DockSubmitForm>}
                {postPopUpActive && <PostSubmitForm></PostSubmitForm>}
                {statusPopUpActive && <StatusInput appendNewStatus={null} isReply = {false} parentStatusId = {null}></StatusInput>}
                <div style ={{display: 'flex', width: '100%'}}>
                <div style={{backgroundColor: 'white'}}>
                    <h1 className='headerText'  style={{paddingTop: '6px',paddingLeft: '2px', color: '#2762a9'}}>Harbor</h1>
                </div>
                <nav className ='divBackground' id='headerNav' style={{display: 'flex', width: '100%', paddingTop:'7px', flexDirection: 'row',
                justifyContent: 'space-evenly'}}>
                   {/*} <div id='buffer' style={{flexBasis: '100px'}}></div>*/}
                    <Tooltip title="Home">
                        <Link className = 'headerItem' to="/home">
                            <HomeRoundedIcon style={{fill: " #5f7b98"}}></HomeRoundedIcon>
                            {/*<span className={['navHover', 'inherentFont'].join(" ")}>Home</span>*/}
                        </Link>
                    </Tooltip>
                    <Tooltip title="Subscriptions">
                        <Link className = 'headerItem' to="/subscriptions">
                            <ListRoundedIcon style={{fill: " #5f7b98"}}></ListRoundedIcon>
                            {/*<span className={['navHover', 'inherentFont'].join(" ")}>Subscriptions</span>*/}
                            
                        </Link>
                    </Tooltip>
                    <Tooltip title="Notifications">
                    <Link className= 'headerItem' to='/notifications' >
                        <NotificationsNoneRoundedIcon style={{fill: " #5f7b98"}}></NotificationsNoneRoundedIcon>
                        {/*<span className='inherentFont'>Notifications</span>  */}
                    </Link></Tooltip>
                    <Tooltip title="Search">
                        <div style={{display: 'flex', width:'20%'}}>
                            <input style={{width: '100%'}}></input>
                            <div style={{backgroundColor: 'orange'}}>
                                <SearchIcon></SearchIcon>
                            </div>
                        </div>
                    </Tooltip>
                    {/*
                    <Link className= 'headerItem' to='http://localhost/explore'>
                        <ExploreRoundedIcon style={{fill: " #5f7b98"}}></ExploreRoundedIcon>
                        {/*<span className='inherentFont'>Explore</span>
                    </Link>
                    */}
                    <Tooltip title="Create Dock">
                        <div onClick ={()=>activateSubMenu('community')} className= 'headerItem' href={'http://localhost/submit/dock'}>
                            <AddBoxRoundedIcon style={{fill: " #5f7b98"}}></AddBoxRoundedIcon>
                            {/*<span className={['navHover', 'inherentFont'].join(" ")}>Create Community</span>*/}
                        </div>
                    </Tooltip>
                    <Tooltip title="Create Post">
                        <div onClick ={()=>activateSubMenu('post')} className= 'headerItem' href={'http://localhost/submit/post'}>
                            <AddCircleOutlineRoundedIcon style={{fill: " #5f7b98"}}></AddCircleOutlineRoundedIcon>
                            {/*<span className={['navHover', 'inherentFont'].join(" ")}>Create Post</span>  */}
                        </div>
                    </Tooltip>
                    <Tooltip title="Create status">
                        <div onClick ={()=>activateSubMenu('status')} className= 'headerItem' href={'http://localhost/submit/status'}>
                            <CreateRoundedIcon style={{fill: " #5f7b98"}}></CreateRoundedIcon>
                            {/*<span className={['navHover', 'inherentFont'].join(" ")}>Create Status</span>*/}
                        </div>
                    </Tooltip>
                    <Tooltip title="Settings">
                        <Link className= 'headerItem' to='/settings' >
                            <SettingsRoundedIcon style={{fill: " #5f7b98"}}></SettingsRoundedIcon>
                            {/*<span className='inherentFont'>Settings</span>    */}
                        </Link>
                    </Tooltip>
                    <Tooltip title="Notifications">
                    <Link className= 'headerItem' to={'/user/' + userData.username }>
                        <AccountCircleRoundedIcon style={{fill: " #5f7b98"}}></AccountCircleRoundedIcon>
                       {/* <span className={['navHover', 'inherentFont'].join(" ")}>Profile</span> */}
                        
                    </Link>
                    </Tooltip>
                </nav>
                </div>
                
               
                
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