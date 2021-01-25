import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Autocomplete extends Component {
    constructor(props){
        super(props)
        console.log(props)
    }

  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };
  state = {
    activeOption: 0,
    options: [],
    showOptions: false,
    userInput: ''
  };
  redirectIfDockChange(){
        let dockInput = document.getElementById('dockInput')
        let dockPosttitle = document.getElementById('dockPostTitle')
}
  onChange = (e) => {
    this.setState({ userInput: e.currentTarget.value,})
    console.log(e.currentTarget.value.length)
    
    if (e.currentTarget.value.length == 0){
        this.setState({options: []})
        this.setState({showOptions: false})
    }
    else{
        this.populateAutoCompleteList(e.currentTarget.value);
    }
  };

  populateAutoCompleteList(searchValue){
    
    let token = document.getElementById('csrf-token').getAttribute('content')
    console.log('pickles');
    
    var url = new URL('http://localhost:80/api/docks')
    var param = {query: searchValue}

    url.search = new URLSearchParams(param).toString();
    
    fetch(url, {
    headers:{
        'X-CSRF-TOKEN': token,
        'Content-Type':'application/json',
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true 
    },
    method: 'get',
    mode: "cors",
    credentials: "same-origin",
    }).then((response) => {
        console.log("response" + response);
        console.log("response Data" + response.data)
        response.json().then((data) => {
            if (data.newArray != 'null'){
            console.log(data.newArray)
            this.setState({options:data.newArray})
            this.setState({showOptions: true})

            }else {
                this.setState({options: [], showOptions: false})
                
            }
            
        });
    })
}

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
  };
  onKeyDown = (e) => {
    const { activeOption, options } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: options[activeOption]
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === options.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, options, showOptions, userInput }
    } = this;
    let optionList;
    if (showOptions) {
      if (options.length) {
        optionList = (
          <ul className="options">
            {options.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Docks found!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
          <input
            style={{borderStyle: 'none'}}
            className="thinInput"
            placeholder='Choose a destination dock for this post'
            id="dockInput"
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
        </div>
        {optionList}
      </React.Fragment>
    );
  }
}

export default Autocomplete;
