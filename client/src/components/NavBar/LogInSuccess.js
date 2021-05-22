import React, {Fragment} from 'react'



const LogInSuccess = () => {

  let clientData = {}
  if (JSON.parse(sessionStorage.getItem('customerData'))) {
    clientData = JSON.parse(sessionStorage.getItem('customerData'))
  } else {
    clientData = {name: 'valued customer'}
  }
 
  const {name} = clientData;

  const updateLoginStatus = () => {
    window.dispatchEvent(new Event('storage'));
  }

  return (
    <Fragment>
       <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header d-flex justify-content-between">
                    <h4 class="modal-title">Login</h4>
                  </div>
                  <div class="modal-body"> 
                      <h2>Hello {name}</h2>
                      <h4>You are now logged in!</h4>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" onClick={() => updateLoginStatus()}data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>   
    </Fragment>
  )
}

export default LogInSuccess;