/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import car from '../assets/car.svg';
import logo from '../assets/logo.png';
import searchIcon from '../assets/searchIcon.svg';
import { getCart } from '../services/cart';
import './Header.css';

export default function Header({ onSearch }) {
  const [search, setSearch] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleClick = () => {
    onSearch(search);
  };

  useEffect(() => {
    const cartItems = getCart();
    const itemCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
    setCartItemCount(itemCount);
  }, []);

  return (
    <div className="header">
      <div className="search">
        <input
          className="input-search"
          name="productSearch"
          data-testid="query-input"
          type="text"
          value={ search }
          placeholder="Digite o que você busca"
          onChange={ ({ target }) => setSearch(target.value) }
          onKeyDown={ (e) => {
            if (e.key === 'Enter') {
              onSearch(search);
            }
          } }
        />
        <button
          className="button-search"
          onClick={ handleClick }
          data-testid="query-button"
          type="button"
        >
          {' '}
          <img className="icon-search" src={ searchIcon } alt="car" />
        </button>
      </div>
      <img
        src={ logo }
        alt="logo"
      />
      <div>
        <Link to="/shopping-cart">
          <div className="cart-icon">
            <i className="fa fa-shopping-cart" />
            <span className="cart-item-count">{cartItemCount}</span>
          </div>
          <button className="button-car" data-testid="shopping-cart-button">
            <img src={ car } alt="car" />
          </button>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func,
}.isRequired;
