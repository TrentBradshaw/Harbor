import { toArray } from 'lodash';
import React, { Component } from 'react';
import { render } from "react-dom";
import ReactDOM from 'react-dom';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';


export default class Header extends Component {
    constructor() {
        super();
    
        this.state = {
          showMenu: false
        };
    
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
      }
    
      showMenu(event) {
        event.preventDefault();
    
        this.setState({
          showMenu: true
        });
    
        document.addEventListener("click", this.closeMenu);
      }
    
      closeMenu(event) {
        if (!this.dropdownMenu.contains(event.target)) {
          this.setState({
            showMenu: false
          });
    
          document.removeEventListener("click", this.closeMenu);
        }
      }
    
      render() {
        return (
          <div>
            <button onClick={this.showMenu}>Show Menu</button>
            {this.state.showMenu ? (
              <div
                style={{
                  width: "100px",
                  border: "1px solid #eee",
                  padding: "10px"
                }}
                ref={element => {
                  this.dropdownMenu = element;
                }}
              >
                <button> Menu Item 1 </button>
                <button> Menu Item 1 </button>
                <button> Menu Item 1 </button>
              </div>
            ) : null}
          </div>
        );
      }
}
  
if (document.getElementById('Header')) {
   var data = document.getElementById('dataHolder').getAttribute('data');
   var currentUser = document.getElementById('dataHolder').getAttribute('user')
   ReactDOM.render(<Header user={currentUser} data={data}/>, document.getElementById('Header'));
}