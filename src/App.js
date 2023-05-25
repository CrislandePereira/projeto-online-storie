import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => <ProductList { ...props } /> }
        />
        <Route
          path="/shopping-cart"
          render={ (props) => <ShoppingCart { ...props } /> }
        />
        <Route
          path="/product-detail/:id"
          render={ (props) => <ProductDetail { ...props } /> }
        />
        <Route
          path="/checkout"
          render={ (props) => <Checkout { ...props } /> }
        />
      </Switch>
    </div>
  );
}

export default App;
