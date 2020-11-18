import React, { Component } from 'react';
import Autocomplete from './Autocomplete';

class AutoCompleteDockLookup extends Component{
    constructor(props){
        super(props)
        this.state = {
            ArrayOf7 : [],
            currentSearchValue: '',
            initialState: true,
            loaded: false
        }
    }
   
    render(){
        return (
            <div className="App">
              <Autocomplete seeIfShouldLoad={this.seeIfShouldLoad} loaded = {this.state.loaded}stateHandler = {this.stateHandler} populateAutoCompleteList = {this.populateAutoCompleteList}
                options={[this.state.ArrayOf7 ]}
              />
            </div>
          );
    }
};
export default AutoCompleteDockLookup;