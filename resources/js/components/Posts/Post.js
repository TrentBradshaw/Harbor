import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Post extends Component{
    constructor(props){
        super(props)
        this.state = { }
    }
   
    render(){
        const url = '/api/post/' + postID;
        console.log(url);
        let token = document.getElementById('csrf-token').getAttribute('content')

        var url = new URL('http://127.0.0.1:8000/api/post')
         param = {query: postID}

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
            
        return (
            <div className="App">
              <h1>
                  YEEEEEEEEEEEEEEEEEEEEEET
              </h1>
            </div>
          );
    }
};
if (document.getElementById('PostContainer')) {
    var postID = document.getElementById('dataHolder').getAttribute('postID');
    
    ReactDOM.render(<Post/>, document.getElementById('PostContainer'));
}
 
export default Post ;