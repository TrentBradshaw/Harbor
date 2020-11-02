import React, { Component } from 'react';
import ReactDOM from 'react-dom';


//Feed a statement array into the Statement class as props
class Statement extends Component {   
    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props.value.body);
        return (
            <React.Fragment key={this.props.value.statement_id} >
                <div style={{  backgroundColor: "blue", borderColor: 'rgb(56, 68, 77)', border: '1px solid'}}> 
                    {/* Fill in the rest of the statement values, username, profile picture, etc */}
                    <p>{ this.props.value.body }</p>
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

export default Statement;