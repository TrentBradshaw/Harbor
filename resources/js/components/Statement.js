import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Statement extends Component {   
    constructor(props){
        super(props);

        console.log('fedw');
    }
    render() {
        console.log(this.props.value[0].body);
        return (
            <React.Fragment key={this.props.value[0].statement_id} >
                <div style={{  backgroundColor: "blue"}}> 
                    <p>{ this.props.value[0].body }</p>
                </div>
            </React.Fragment>
        );
    }
}
class StatementContainer extends Component {
    constructor(props){
        super(props);

        console.log('fedt');
    }
    render(){
        var data = JSON.parse(this.props.data);
        var arr = data[Object.keys(data)[1]];
        console.log(arr);
        console.log('daab');
        
            var elements=[];
            for(var i=0;i<arr.length;i++){
                 // push the component to elements!
                elements.push(<Statement value={ arr[i] } key = {JSON.stringify(arr[i][0].statement_id)}/>);
                console.log('arr' + i + " : " + JSON.stringify(arr[i]))
                console.log('id and key' + i + " : " + JSON.stringify(arr[i]).statement_id)
                console.log('iddd and key' + i + " : " + JSON.stringify(arr[i].statement_id))
            }
            return (
                <div> 
                {elements}
                </div>
        );
    }
}
if (document.getElementById('statement')) {
    var data = document.getElementById('dataHolder').getAttribute('data');
    ReactDOM.render(<StatementContainer data={data} />, document.getElementById('statement'));
 }
