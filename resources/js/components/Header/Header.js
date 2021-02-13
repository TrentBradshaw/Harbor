import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import DockSubmitForm from '../DockSubmitForm';
import StatusInput from '../SubmitPages/StatusInput';
import PostSubmitForm from '../SubmitPages/PostSubmitForm';
import Loading from '../Utility/Loading';

function Header() {
    const [userData, setUserData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [popUpclicked, setPopUpClicked] = useState(false);
    const [communityPopUpActive, setCommunityPopUpActive] = useState(false);
    const [postPopUpActive, setPostPopUpActive] = useState(false);
    const [statusPopUpActive, setStatusPopUpActive] = useState(false);

    useEffect(() => {
        fetch('https://harborsms.herokuapp.com/api/userdetails', {
            headers: {
                'X-CSRF-TOKEN': document
                    .getElementById('csrf-token')
                    .getAttribute('content'),
                'Content-Type': 'application/json',
            },
            method: 'get',
            mode: 'same-origin',
            credentials: 'same-origin',
        }).then((response) => {
            console.log(response);
            response.json().then((data) => {
                console.log(data);
                setUserData(data);
                setLoading(false);
            });
        });
    }, []);

    function activateSubMenu(menu) {
        setPopUpClicked(true);
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

    function popUpBackdropClicked() {
        setPopUpClicked(false);
        setCommunityPopUpActive(false);
        setPostPopUpActive(false);
        setStatusPopUpActive(false);
    }

    if (isLoading) return <Loading />;

    return (
        <div>
            <div
                id="header"
                style={{
                    display: 'flex',
                    width: '100%',
                    position: 'fixed',
                    left: '0px',
                    top: '0px',
                    height: '40px',
                }}
            >
                {popUpclicked && (
                    <button
                        aria-label="pop up backdrop button"
                        type="button"
                        onClick={() => popUpBackdropClicked()}
                        id="popUpBackdrop"
                    />
                )}
                {communityPopUpActive && <DockSubmitForm />}
                {postPopUpActive && <PostSubmitForm />}
                {statusPopUpActive && (
                    <StatusInput
                        appendNewStatus={null}
                        isReply={false}
                        parentStatusId={null}
                    />
                )}
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ backgroundColor: 'white' }}>
                        <h1
                            className="headerText"
                            style={{
                                paddingTop: '6px',
                                paddingLeft: '2px',
                                color: '#2762a9',
                            }}
                        >
                            Harbor
                        </h1>
                    </div>
                    <nav
                        className="divBackground"
                        id="headerNav"
                        style={{
                            display: 'flex',
                            width: '100%',
                            paddingTop: '7px',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        {/* } <div id='buffer' style={{flexBasis: '100px'}}></div> */}
                        <Tooltip title="Home">
                            <Link className="headerItem" to="/home">
                                <HomeRoundedIcon style={{ fill: ' #5f7b98' }} />
                                {/* <span className={['navHover', 'inherentFont'].join(" ")}>Home</span> */}
                            </Link>
                        </Tooltip>
                        <Tooltip title="Subscriptions">
                            <Link className="headerItem" to="/subscriptions">
                                <ListRoundedIcon style={{ fill: ' #5f7b98' }} />
                                {/* <span className={['navHover', 'inherentFont'].join(" ")}>Subscriptions</span> */}
                            </Link>
                        </Tooltip>
                        <Tooltip title="Notifications">
                            <Link className="headerItem" to="/notifications">
                                <NotificationsNoneRoundedIcon
                                    style={{ fill: ' #5f7b98' }}
                                />
                                {/* <span className='inherentFont'>Notifications</span>  */}
                            </Link>
                        </Tooltip>
                        <Tooltip title="Search">
                            <div style={{ display: 'flex', width: '20%' }}>
                                <input style={{ width: '100%' }} />
                                <div style={{ backgroundColor: 'orange' }}>
                                    <SearchIcon />
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
                            <button
                                type="button"
                                onClick={() => activateSubMenu('community')}
                                className="headerItem"
                                href="http://localhost/submit/dock"
                            >
                                <AddBoxRoundedIcon
                                    style={{ fill: ' #5f7b98' }}
                                />
                                {/* <span className={['navHover', 'inherentFont'].join(" ")}>Create Community</span> */}
                            </button>
                        </Tooltip>
                        <Tooltip title="Create Post">
                            <button
                                type="button"
                                onClick={() => activateSubMenu('post')}
                                className="headerItem"
                                href="http://localhost/submit/post"
                            >
                                <AddCircleOutlineRoundedIcon
                                    style={{ fill: ' #5f7b98' }}
                                />
                                {/* <span className={['navHover', 'inherentFont'].join(" ")}>Create Post</span>  */}
                            </button>
                        </Tooltip>
                        <Tooltip title="Create status">
                            <button
                                type="button"
                                onClick={() => activateSubMenu('status')}
                                className="headerItem"
                                href="http://localhost/submit/status"
                            >
                                <CreateRoundedIcon
                                    style={{ fill: ' #5f7b98' }}
                                />
                                {/* <span className={['navHover', 'inherentFont'].join(" ")}>Create Status</span> */}
                            </button>
                        </Tooltip>
                        <Tooltip title="Settings">
                            <Link className="headerItem" to="/settings">
                                <SettingsRoundedIcon
                                    style={{ fill: ' #5f7b98' }}
                                />
                                {/* <span className='inherentFont'>Settings</span>    */}
                            </Link>
                        </Tooltip>
                        <Tooltip title="Notifications">
                            <Link
                                className="headerItem"
                                to={`/user/${userData.username}`}
                            >
                                <AccountCircleRoundedIcon
                                    style={{ fill: ' #5f7b98' }}
                                />
                                {/* <span className={['navHover', 'inherentFont'].join(" ")}>Profile</span> */}
                            </Link>
                        </Tooltip>
                    </nav>
                </div>
            </div>
        </div>
    );
}
export default Header;
