import React, {Fragment} from 'react';
import './app.css';

import BookView from './components/BookView/BookView';
import CartView from './components/CartView/CartView';
import NavBar from './components/NavBar/NavBar'

function App() {
  return (
      <Fragment>
      <NavBar/>
      <div className="container">
        <BookView/>
        <CartView/>
      </div>
      </Fragment>
  );
}

export default App;
