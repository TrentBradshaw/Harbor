import { divide, toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Statement from './Statement';

//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
export default class UserPageFeed extends Component {
    
    constructor(props){ super(props);}
    
    render(){
        //console.log('props' + JSON.stringify(this.props.feedInfo));
        
        //CLEAN THIS UP SO WE DON'T HAVE TO USE INDEXING WITH THE ARRAY BEYOND SPECIFIYING THE SUB-ARRAY
        var data = false//JSON.parse(this.props.feedInfo);
        
        if(data){
            const tempData = data[0]
            console.log('data from UserPageContentLoad')
            console.log(data)
            console.log('tempdata from UserPageContentLoad')
            console.log('tempdata' + tempData)
        
        


            //for each statement in the tempData array(rename to statements array), push a statement object into it with the data for the current statement
            var elements=[];

            //use an alternative method in the future like .map or maybe reactCloneElement 
            for(var i=0;i<data.length;i++){
                 // push the component to elements array
                console.log('tempdata loop' + JSON.stringify(data[i]))
                elements.push(<Statement value={ data[i] } key = {JSON.stringify(data[i].statement_id)}/>);
            }
            if(tempData){
                return (
                    <div> 
                    {elements}
                    </div>
            );
            }
            else{
                return(
                    <div>
                        <h1>No Content to show currently. Try following some people!</h1>
                    </div>
                );
            }
            //return all of the elements
            
    }else{
        return null;
    }
    }   
}  

if (document.getElementById('content')) {
   var feedInfo = document.getElementById('dataHolder').getAttribute('feedInfo');
   var currentUser = document.getElementById('dataHolder').getAttribute('user')
   ReactDOM.render(<UserPageFeed user={currentUser} feedInfo={feedInfo}/>, document.getElementById('content'));
}