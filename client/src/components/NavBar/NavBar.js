import React, {Fragment, useEffect, useState} from 'react';
import Login from './LogIn'
import About from './About';
import Register from './Register'
import axios from 'axios';

const NavBar = () => {

  const [signedIn, setSignedIn] = useState(false);

  const sessionStore = window.sessionStorage;

  const checkIfSignedIn = () => {
    if(sessionStore.getItem('customerData')) {
      setSignedIn(true)
    } 
  }

  const logOut = async () => {
    const customerData = await JSON.parse(sessionStore.getItem('customerData'));
    const {userId, sessionId} = await customerData;
    axios(`http://localhost:5500/api/login/logout?id=${userId}&sessionid=${sessionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    }});
    await window.localStorage.clear();
    await window.sessionStorage.clear();
    await setSignedIn(false);
  }

  useEffect(() => {
    checkIfSignedIn()
  }, [])

  window.addEventListener('storage', () => {
    checkIfSignedIn();
  })

  return (
    <Fragment>
      <nav class="navbar navbar-expand-lg navbar-light bg-light ml-2 px-5">
        <a class="navbar-brand" href="#">Limited Range Bookshop</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a type="button" class="nav-link" data-toggle="modal" data-target="#myModal">About</a>
            {/* Model */}
            <div class="modal fade" id="myModal" role="dialog">
              <About />
            </div>
            </li>
            {/* End of modal */}
            {signedIn ? 
            <li class="nav-item active">
              <a onClick={() => logOut()} type="button" class="nav-link" >Log Out</a>
            </li>
            :
            <Fragment> 
            <li class="nav-item active">
              <a type="button" class="nav-link" data-toggle="modal" data-target="#loginModal" >Log In</a>
            <div class="modal fade" id="loginModal" role="dialog">
              <Login/>
            </div>
            </li>
            <li class="nav-item active">
              <a type="button" class="nav-link" data-toggle="modal" data-target="#registerModal" >Register</a>
            <div class="modal fade" id="registerModal" role="dialog">
              <Register/>
            </div>
            </li>
            </Fragment>
            }
          </ul>
        </div>
        
      </nav>
    </Fragment>
  )
}

export default NavBar;