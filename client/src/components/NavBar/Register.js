import React, {Fragment, useState} from 'react';
import axios from 'axios';
import LogInSuccess from './LogInSuccess'

const Register = () => {

  const [emailValidated, setEmailValidated] = useState(true);
  const [regFailed, setRegFailed] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const sessionStore = window.sessionStorage;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const first_name = e.target.first_name.value
    const last_name = e.target.last_name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const address_1 = e.target.address_1.value
    const address_2 = e.target.address_2.value
    const postal_town = e.target.postal_town.value
    const postcode = e.target.postcode.value
    const sessionData = await axios(`http://localhost:5500/api/register?email=${email}&password=${password}&first_name=${first_name}&last_name=${last_name}&address_1=${address_1}&address_2=${address_2}&postal_town=${postal_town}&postcode=${postcode}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
     }});
     if (await sessionData.data.status === 'Success') {
        sessionStore.setItem('customerData', JSON.stringify(sessionData.data));
       setLoggedIn(true);
     } else {
        setRegFailed(true)
     }
      
  }
  
  let ifRegFails = regFailed ? "text-danger" : "invisible";

  let emailClass = emailValidated ? "form-control mt-2" : "form-control mt-2 is-invalid";

  const validateEmail = (e) => {
    const validEmail = /^[^\s@]+@[^\s@]+$/
    if(! e.target.value.match(validEmail)) {
      setEmailValidated(false);
    } else {
      setEmailValidated(true);
    }
  }

  if(loggedIn) {
    return (
      <LogInSuccess />
    )
  } else {
    return(
      <Fragment>
        <div class="bd-example-modal-lg w-75 m-auto modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header d-flex justify-content-between">
              <h4 class="modal-title">Register</h4>
            </div>
            <div class="modal-body"> 
              
            <form onSubmit={handleSubmit}> 
                  <div class="form-group">
                    <input name="email" aria-describedby="emailHelp" type="email"
                    id="email"  placeholder="Email" onChange={(e) => validateEmail(e)} class={emailClass}required/>
                    <p class={ifRegFails}>Registration failed.  This email has been used before!</p>
                    <input name="password" type="password" class="form-control mt-2 mb-5" id="password"  placeholder="password" required/>
                    <input name="first_name" type="text" class="form-control mt-2" id="first_name"  placeholder="First Name" required/>
                    <input name="last_name" type="text" class="form-control mt-2" id="last_name"  placeholder="Surname" required/>
                    <input name="address_1" type="text" class="form-control mt-2" id="address_1"  placeholder="First Line of Address" required/>
                    <input name="address_2" type="text" class="form-control mt-2" id="address_2"  placeholder="Second Line of Address (Optional)" />
                    <input name="postal_town" type="text" class="form-control mt-2" id="postal_town"  placeholder="Post Town" required/>
                    <input name="postcode" type="text" class="form-control mt-2" id="postcode"  placeholder="ZIP/Post Code" required/>
                    
                  </div>
                  <button type="submit" class="btn btn-primary">Register</button>
                </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>   
    </Fragment>);
  }

}

export default Register;