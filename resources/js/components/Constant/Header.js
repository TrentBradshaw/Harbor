import { toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import ExploreIcon from '@material-ui/icons/Explore';
import ProfileDropDownMenu from '../DropdownProfileMenu/ProfileDropDownMenu'
import DockDropDownMenu from '../DropdownDockMenu/DockDropDownMenu'


export default class Header extends Component {
  constructor(props){
      super(props);
    }

  render(){
        return (
            <div style={{  flex: '1 0 auto' , padding: '1px 0px', display: "inline-flex", width: '100%', height: '100%'}}>
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
                <ProfileDropDownMenu></ProfileDropDownMenu>
            </div>   
        );
    }   
}  

if (document.getElementById('Header')) {
   var data = document.getElementById('dataHolder').getAttribute('data');
   var currentUser = document.getElementById('dataHolder').getAttribute('currentUser')
   ReactDOM.render(<Header user={currentUser} data={data}/>, document.getElementById('Header'));
}