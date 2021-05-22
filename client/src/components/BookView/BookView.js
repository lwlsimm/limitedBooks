import React, { Fragment, useState, useEffect } from 'react';
import './bookView.css';



const BookView = () => {

  const [books, setBooks] = useState([]);

  
  const getBooks = async () => {
    try {
      const response = await fetch('http://localhost:5500/api/books');
      const jsonData = await response.json();
      setBooks(jsonData);
    } catch (err) {
      console.error(err.message)
    }
    
  }
  
  useEffect(() => {
    getBooks();
  },[])

  const localStore = window.localStorage;

  const addToCart = async (book) => {
    const bookInLocalStorage = await localStore.getItem(book.id);
    if (await ! bookInLocalStorage) {
        const bookForStore = book;
        bookForStore.count = 1;
        localStore.setItem(book.id, JSON.stringify(bookForStore))
        window.dispatchEvent(new Event('storage'));
    } 
  }

  return (
    <Fragment>
    <div className="topDiv">
      {books.map(book =>
        <div key={book.id} className="bookCard" style={{}}>
          <div className="imgContainer">
            <img className="bookPic" src={book.pic_link}/>
            {book.quantity < 1  ?
              <button type="button" className="btn btn-primary addBtn">Out of Stock</button> :
              <button onClick={() => {addToCart(book)}} type="button" className="btn btn-primary addBtn">Add to Cart</button>
            }
            
          </div>
          <div className="cardText">
            <p className="bookTitle">{book.title}</p>
            <p className="bookAuthor">{book.author_first_name} {book.author_surname}</p>
            <p className="bookDesc">{book.description}</p>
            <p className="bookPrice">{book.price}</p>
            
          </div>
        </div>
      )}
    </div>
    </Fragment>
  )
}

export default BookView;

