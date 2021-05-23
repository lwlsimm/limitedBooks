import React, {Fragment, useState, useEffect} from 'react';
import Book from './Book';
import axios from 'axios'
import './orderModel.css'

const OrderModal= (props) => {

  const books = props.books;
  const total = props.total;
  const addressData = props.addressData;
  const sessionStore = window.sessionStorage;

  const handleSubmit = async (e) => {
    const formDetails = e.target;
    const orderDetails = {
      books: books,
      total: total,
      first_name: formDetails.first_name.value,
      last_name: formDetails.last_name.value,
      address_1: formDetails.address_1.value,
      address_2: formDetails.address_2.value,
      postal_town: formDetails.postal_town.value,
      postcode: formDetails.postcode.value
    }
    const orderConfirmation = await axios(`http://localhost:5500/api/order`, {
      method: "POST",
      body: orderDetails,
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
      }
    });
  }

  return (
    <Fragment>
              <div class="bd-example-modal-lg w-75 m-auto modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header d-flex justify-content-between">
                    <h4 class="modal-title">Place Your Order</h4>
                  </div>
                  <div class="modal-body"> 
                    {/* {books.map(book => 
                      <Book id={books.id} pic_link={book.pic_link} title={book.title} count={book.count} price={book.price}/>)
                    } */}
                  <h2 class="text-center">Total to Pay: ${total}</h2>
                  <form onSubmit={handleSubmit}> 
                    <div class="form-group">
                      <input name="name" type="text" class="form-control mt-2" id="name"  value={addressData.name} />
                      <input name="address1" type="text" class="form-control mt-2" id="address1" value={addressData.address_1}/>
                      <input name="address2" type="text" class="form-control mt-2" id="address2"  value={addressData.address_2} />
                      <input name="address3" type="text" class="form-control mt-2" id="address3" value={addressData.postal_town} />
                      <input name="postcode" type="text" class="form-control mt-2" id="address5"  value={addressData.postcode} />
                        <br/>
                        <div class="row">
                          <div class="col-md-6 mb-3">
                            <label for="cc-name">Name on card</label>
                            <input type="text" class="form-control" id="cc-name" value={addressData.name} disabled/>
                            <small class="text-muted">Full name as displayed on card</small>
                            <div class="invalid-feedback">
                              Name on card is required
                            </div>
                          </div>
                          <div class="col-md-6 mb-3">
                            <label for="cc-number">Credit card number</label>
                            <input type="text" class="form-control" id="cc-number" value="1234-5678-9012-3456"
                            disabled/>
                            <div class="invalid-feedback">
                              Credit card number is required
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-3 mb-3">
                            <label for="cc-expiration">Expiration</label>
                            <input type="text" class="form-control" id="cc-expiration" value="12/24" disabled/>
                            <div class="invalid-feedback">
                              Expiration date required
                            </div>
                          </div>
                          <div class="col-md-3 mb-3">
                            <label for="cc-expiration">CVV</label>
                            <input type="text" class="form-control" id="cc-cvv" value="123" disabled/>
                            <div class="invalid-feedback">
                              Security code required
                            </div>
                          </div>
                        </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-lg btn-block">Submit</button>
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
