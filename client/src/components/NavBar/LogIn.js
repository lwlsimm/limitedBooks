import React, {Fragment, useState} from 'react';
import axios from 'axios'
import LogInSuccess from './LogInSuccess'

const Login = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [wrongPw, setWrongPw] = useState(false);
  const sessionStore = window.sessionStorage;
  
  const handleSubmit = async (e) => {
    setWrongPw(false)
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const sessionData = await axios(`http://localhost:5500/api/login?email=${email}&password=${password}`, {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      }});
      if (await sessionData.data.status === 'Success') {
        sessionStore.setItem('customerData', JSON.stringify(sessionData.data));
        setLoggedIn(true);
      } else {
        setWrongPw(true)
      }
    } catch (error) {
      setWrongPw(true)
    }
  }
  
  let clientData = {}
  if (JSON.parse(sessionStorage.getItem('customerData'))) {
    clientData = JSON.parse(sessionStorage.getItem('customerData'))
  } else {
    clientData = {name: 'valued customer'}
  }
 
  const {name} = clientData;
  
  if(loggedIn) {
    return (
      <LogInSuccess />
    )
  }
  return (
    <Fragment>
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header d-flex justify-content-between">
                    <h4 class="modal-title">Login</h4>
                  </div>
                  <div class="modal-body"> 
                      <form onSubmit={handleSubmit}> 
                        <div class="form-group">
                          <label for="email">Email address</label>
                          <input name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                          {wrongPw ? <p class='text-danger'>Email/Password combination do not match our records.  Please try again</p> : ''}
                          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                          <label for="password">Password</label>
                          <input name="password" type="password" class="form-control" id="password" placeholder="Password" />
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>   
    </Fragment>)
}

export default Login;