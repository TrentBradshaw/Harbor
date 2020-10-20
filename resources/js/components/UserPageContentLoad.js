import { divide, toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Statement from './Statement';

//SPLIT THIS UP LATER. SPLIT USER PROFILE LOAD INTO ONE COMPONENT, THEN SWITCH USER CONTENT LOAD INTO ANOTHER
export default class UserPageContentLoad extends Component {
  constructor(props){
      super(props);
      console.log(props);
    }
 
    render(){

        //CLEAN THIS UP SO WE DON'T HAVE TO USE INDEXING WITH THE ARRAY BEYOND SPECIFIYING THE SUB-ARRAY
        var data = JSON.parse(this.props.data);
        const tempData = data['feedInfo'][0];
        console.log('data from UserPageContentLoad')
        console.log(data)
        console.log('tempdata from UserPageContentLoad')
        console.log(tempData)


            //for each statement in the tempData array(rename to statements array), push a statement object into it with the data for the current statement
            var elements=[];

            //use an alternative method in the future like .map or maybe reactCloneElement 
            for(var i=0;i<tempData.length;i++){
                 // push the component to elements array
                console.log(tempData[i])
                elements.push(<Statement value={ tempData[i] } key = {JSON.stringify(tempData[i].statement_id)}/>);
            }
            //return all of the elements
            return (
                <div> 
                {elements}
                </div>
        );
    }   
}  

if (document.getElementById('content')) {
   var data = document.getElementById('dataHolder').getAttribute('data');
   var currentUser = document.getElementById('dataHolder').getAttribute('user')
   ReactDOM.render(<UserPageContentLoad user={currentUser} data={data}/>, document.getElementById('content'));
}