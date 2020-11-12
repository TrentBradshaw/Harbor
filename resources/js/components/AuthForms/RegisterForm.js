import { toArray } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FlashMessage from 'react-flash-message';


export default class RegisterForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isRegistered: false,
            error: '',
            errorMessage: '',
            formSubmitting: false,
            user: {
                username: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    }
    
      handleSubmit(e) {
        e.preventDefault();
        this.setState({formSubmitting: true});
        ReactDOM.findDOMNode(this).scrollIntoView();
        let userData = this.state.user;
        axios.post("/api/auth/register", userData)
          .then(response => {
              console.log(response)
            return response;
        }).then(json => {
            if (json.data.success) {
                console.log(json)
              let userData = {
                id: json.data.id,
                username: json.data.username,
                email: json.data.email,
                activation_token: json.data.activation_token,
              };
              let appState = {
                isRegistered: true,
                user: userData
              };
              document.cookie = "api_token=" + json.data.token;
              localStorage["appState"] = JSON.stringify(appState);
              this.setState({
                isRegistered: appState.isRegistered,
                user: appState.user
              });
              
            } else {
                alert(`Our System Failed To Register Your Account!`);
            }
       }).catch(error => {if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            let err = error.response.data;
            this.setState({
              error: err.message,
              errorMessage: err.errors,
              formSubmitting: false
            })
          }
          else if (error.request) {
            // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
            let err = error.request;
            this.setState({
              error: err,
              formSubmitting: false
            })
         } else {
             // Something happened in setting up the request that triggered an Error
             let err = error.message;
             this.setState({
               error: err,
               formSubmitting: false
             })
         }
       }).finally(this.setState({error: ''}));
      }
      handleUsername(e) {
        let value = e.target.value;

        this.setState(prevState => ({
          user: {
            ...prevState.user,
            username: value
          }
        }));
      }
      // 2.5
      handleEmail(e) {
        let value = e.target.value;
        this.setState(prevState => ({
          user: {
            ...prevState.user, email: value
          }
        }));
      }
      handlePassword(e) {
        let value = e.target.value;
        this.setState(prevState => ({
          user: {
            ...prevState.user, password: value
          }
        }));
      }
      handlePasswordConfirm(e) {
        let value = e.target.value;
        this.setState(prevState => ({
          user: {
            ...prevState.user, password_confirmation: value
          }
        }));
      }

  render(){

        return (
            <div className="container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                        <h2>Create Your Account</h2>
                        // 2.7
                        {this.state.isRegistered ? <FlashMessage duration={60000} persistOnHover={true}>
                        <h5 className={"alert alert-success"}>Registration successful, redirecting...</h5></FlashMessage> : ''}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                            <input id="username" type="text" placeholder="userame" className="form-control" required onChange={this.handleUsername}/>
                            </div>
                            <div className="form-group">
                            <input id="email" type="email" name="email" placeholder="E-mail" className="form-control" required onChange={this.handleEmail}/>
                            </div>
                            <div className="form-group">
                            <input id="password" type="password" name="password" placeholder="Password" className="form-control" required onChange={this.handlePassword}/>
                            </div>
                            <div className="form-group">
                            <input id="password_confirmation" type="password" name="password_confirmation" placeholder="Confirm Password" className="form-control" required onChange={this.handlePasswordConfirm} />
                            </div>
                            <button type="submit" name="singlebutton" className="btn btn-default btn-lg  btn-block mb10" disabled={this.state.formSubmitting ? "disabled" : ""}>Create Account</button>
                        </form>
                        <p className="text-white">Already have an account?
                            <a href="/login" className="text-yellow"> Log In</a>
                            
                        </p>
                    </div>
                </div>
            </div>
        );
    }   
}  

if (document.getElementById('RegistrationFormHolder')) {
   ReactDOM.render(<RegisterForm/>, document.getElementById('RegistrationFormHolder'));
}