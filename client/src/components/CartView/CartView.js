import React, { Fragment, useEffect, useState } from 'react';
import './cartView.css';
import CartModal from '../OrderModal/OrderModal'
import OrderModal from '../OrderModal/OrderModal';

const CartView = () => {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0)
  
  const sessionStorage = window.localStorage;

  const getBooksFromStorage = () => {
    const bookKeys = Object.keys(sessionStorage);
    const booksForCart = [];
    let runningTotal = 0;
    for(let key in bookKeys){
      let id = bookKeys[key];
      let bookObject = JSON.parse(sessionStorage.getItem(id));
      if (bookObject.count > 0) {
        booksForCart.push(bookObject);
        runningTotal = runningTotal + Number(bookObject.price.replace(/[^0-9.-]+/g,"") * bookObject.count)
      }
    }
    setBooks(booksForCart);
    setTotal(runningTotal)
  }

  const changeBookQuantity = (id, direction) => {
    let change;
    if(direction === 'up'){
      change = 1
    } else {
      change = -1
    }
    let bookObject = JSON.parse(sessionStorage.getItem(id));
    bookObject.count = bookObject.count + change;
    if (bookObject.count < 1) 
      {deleteFromCart(id);
        getBooksFromStorage()
      return}
    else if (bookObject.count > bookObject.quantity)
      {bookObject.count = bookObject.quantity}
    sessionStorage.setItem(id, JSON.stringify(bookObject));
    getBooksFromStorage()
  }

  const deleteFromCart = (id) => {
    sessionStorage.removeItem(id)
    getBooksFromStorage()
  }

  useEffect(() => {
    getBooksFromStorage();
  },[])

  window.addEventListener('storage', () => {
    getBooksFromStorage();
  })

  

  return (
    <Fragment>

      <div class="container mt-5 mb-5 card">
        <div class="d-flex justify-content-center row">
          <div class="col-md-8">
              <div class="p-2">
                  <h4>Shopping cart</h4>
              </div>
              {/* Start of mapped cart items */}
              {books.map(book => 
              <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded" key={book.id}>
                  <div class="mr-1"><img class="rounded" src={book.pic_link} width="30"/></div>
                  <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">{book.title}</span>
                  </div>
                  <div class="d-flex flex-row align-items-center qty"><i class="fa fa-minus text-danger"></i>
                      <button onClick={() => {changeBookQuantity(book.id, 'up')}} type="button" className="btn-sm btn-primary"> + </button>
                      <h5 class="text-grey mt-1 mr-1 ml-1">{book.count}  </h5><i class="fa fa-plus text-success"></i>
                      <button onClick={() => {changeBookQuantity(book.id, 'down')}} type="button" className="btn-sm btn-primary"> - </button> 
                  </div>
                  <div>
                      <h5 class="text-grey">Total Price: ${(Number(book.price.replace(/[^0-9.-]+/g,"")) * book.count).toFixed(2)}</h5>
                  </div>
                  <button onClick={() => {deleteFromCart(book.id)}} type="button" className="btn-sm btn-danger">X</button>
              </div>)}

              {total <= 0 ?
                <div class="p-2">
                <h4>Empty</h4>
            </div> :
            <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button class="btn btn-warning btn-block btn-lg ml-2 pay-button font-weight-bold" type="button" data-toggle="modal" data-target="#cartModal">Proceed to Pay <span class="font-weight-bold">${Number.parseFloat(total.toFixed(2))}</span></button>
            
            <div class="modal fade" id="OrderModal" role="dialog">
              <OrderModal books={books} total={total}/>
            </div>

            </div>
            }
              
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CartView;