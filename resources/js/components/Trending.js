/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';

function activateSubMenu() {
    // implement here
}
function Trending() {
    return (
        <div
            className={['bordered', 'divBackground'].join(' ')}
            style={{
                display: 'flex',
                flexDirection: 'column',
                flexBasis: '20',
                width: '300px',
            }}
        >
            <h1 className={['divHeader'].join(' ')}>
                <span className="headerText">Trending</span>
            </h1>
            <nav
                className="divBackground"
                id="headerNav"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                }}
            >
                <Link className="headerItem" to="/home">
                    Home
                </Link>
                <Link className="headerItem" to="/subscriptions">
                    Subscriptions
                </Link>
                <Link className="headerItem" to="/notifications">
                    Notifications
                </Link>
                <Link className="headerItem" to="http://localhost/explore">
                    Explore
                </Link>
                <div
                    onClick={() => activateSubMenu('community')}
                    className="headerItem"
                    href="http://localhost/submit/dock"
                >
                    Create Community
                </div>
                <div
                    onClick={() => activateSubMenu('post')}
                    className="headerItem"
                    href="http://localhost/submit/post"
                >
                    Create Post
                </div>
                <div
                    onClick={() => activateSubMenu('status')}
                    className="headerItem"
                    href="http://localhost/submit/status"
                >
                    Create Status
                </div>
                <a className="headerItem" href="http://localhost/settings">
                    Settings
                </a>
            </nav>
        </div>
    );
}

export default Trending;
