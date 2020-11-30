import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

    function VotingSystem(props){
        
        return(
            <div style= {{height: '100px'}}>
                <ArrowDropUpIcon></ArrowDropUpIcon>
                <p>number</p>
                <ArrowDropDownIcon></ArrowDropDownIcon>
            </div>
        )


    }

export default VotingSystem;