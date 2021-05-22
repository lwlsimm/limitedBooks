import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import Book from './Book';

const OrderModal= (props) => {

  const [isLoggedin, setIsLoggedIn] = useState()

  const books = props.books;
  const total = props.total;
  const sessionStore = window.sessionStorage;

  useEffect(
    async () => {
      if (checkLogInStatus()) {
        
      } else {

      }
    }, []
  )

  const checkLogInStatus = async () => {
    const {userId, sessionId} = JSON.parse(sessionStorage.getItem('customerData'));
    const validity = await axios(`http://localhost:5500/api/login/check?userId=${userId}&sessionId=${sessionId}`, {
      method: "GET",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    }});
    if(validity.data.valid_session) {
      return true;
    } 
    return false;
  }

  const getAddressDetails = async () => {
    const {sessionId} = JSON.parse(sessionStorage.getItem('customerData'));
    
  }

  const handleSubmit = () => {

  }
  
  return (
    <Fragment>
              <div class="bd-example-modal-lg w-75 m-auto modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header d-flex justify-content-between">
                    <h4 class="modal-title">Cart</h4>
                  </div>
                  <div class="modal-body"> 
                    {books.map(book => 
                      <Book id={books.id} pic_link={book.pic_link} title={book.title} count={book.count} price={book.price}/>)
                    }
                  <h2 class="text-center">Total to Pay: ${total}</h2>
                  <form onSubmit={handleSubmit}> 
                        <div class="form-group">
                          <input name="address1" type="text" class="form-control mt-2" id="address1"  placeholder="First Line of Address" />
                          <input name="address2" type="text" class="form-control mt-2" id="address2"  placeholder="Second Line of Address" />
                          <input name="address3" type="text" class="form-control mt-2" id="address3"  placeholder="Post Town" />
                          <input name="Country" type="text" class="form-control mt-2" id="address4"  placeholder="Country" />
                          <input name="postcode" type="text" class="form-control mt-2" id="address5"  placeholder="ZIP/Post Code" />
                          
                          
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

export default OrderModal;
