import React, { Component } from 'react';
import Autocomplete from './Autocomplete';
class AutoCompleteDockLookup extends Component{
    constructor(props){
        super(props)
        this.state = {
            ArrayOf7 : [
                'Papaya',
                'Persimmon',
                'Paw Paw',
                'Prickly Pear',
                'Peach',
                'Pomegranate',
                'Pineapple'
            ],
            currentSearchValue: ''
        }
        this.stateHandler = this.stateHandler.bind(this)
        this.populateAutoCompleteList = this.populateAutoCompleteList.bind(this)
    }
    stateHandler(searchValue){
        this.setState({currentSearchValue: searchValue})
    }
    populateAutoCompleteList(searchValue){
        
        let token = document.getElementById('csrf-token').getAttribute('content')
        console.log('pickles');
        
        var url = new URL('http://127.0.0.1:8000/api/docks/')
        var param = {query: searchValue}

        url.search = new URLSearchParams(param).toString();

        fetch(url, {
        headers:{
            'X-CSRF-TOKEN': token,
            'Content-Type':'application/json',
        },
        method: 'get',
        mode: "same-origin",
        credentials: "same-origin",
        }).then((response) => {
            console.log(response);
            response.json().then((data) => {
                console.log(data);
            });
        })
    }
    render(){
        return (
            <div className="App">
              <Autocomplete stateHandler = {this.stateHandler} populateAutoCompleteList = {this.populateAutoCompleteList}
                options={[this.state.ArrayOf7 ]}
              />
            </div>
          );

    }
  
};
export default AutoCompleteDockLookup;