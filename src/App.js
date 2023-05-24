import React from 'react';
import './App.css';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ProductList } from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';

function App() {
  const history = createBrowserHistory();
  return (
    <Router history={ history }>
      <div className="App">
        <Switch>
          <Route exact path="/" render={ (props) => <ProductList { ...props } /> } />
          <Route exact path="/shopping-cart" render={ () => <ShoppingCart /> } />
          <Route
            path="/product-detail/:id"
            render={ (props) => <ProductDetail { ...props } /> }
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
