/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoAdd, IoClose, IoRemove } from 'react-icons/io5';
import { getCart, removeToCart, updateCart, getTotalPrice } from '../services/cart';
import Header from '../components/Header';
import back from '../assets/back.svg';
import './ShoppingCart.css';

class ShoppingCart extends Component {
  state = {
    products: [{
      pictures: '',
      title: '',
      price: 0,
      id: '',
      quantity: 0,
    }],
    totalPrice: 0,
  };

  componentDidMount() {
    const cartProducts = getCart();
    this.setState({ products: cartProducts });
    this.handlGetTotalPrice();
  }

  removeProduct = (product) => {
    removeToCart(product);
    const cartProducts = getCart();
    this.setState({ products: cartProducts });
    this.handlGetTotalPrice();
  };

  handleIncreaseQuantity = (product) => {
    const { quantity } = product;
    const newQuantity = quantity + 1;
    updateCart(product, newQuantity);
    const cartProducts = getCart();
    this.setState({ products: cartProducts });
    this.handlGetTotalPrice();
  };

  handleDecreaseQuantity = (product) => {
    const { quantity } = product;
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateCart(product, newQuantity);
      const cartProducts = getCart();
      this.setState({ products: cartProducts });
      this.handlGetTotalPrice();
    } else if (quantity === 1) {
      this.removeProduct(product);
    }
  };

  handleSearch = (search) => {
    const { history } = this.props;
    history.push(`/?q=${search}`);
  };

  handleBackToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  handlGetTotalPrice = () => {
    const totalPrice = getTotalPrice();
    this.setState((prevState) => ({
      ...prevState,
      totalPrice,
    }));
  };

  render() {
    const { products, totalPrice } = this.state;
    return (
      <>
        <Header onSearch={ this.handleSearch } />
        <div className="page-car">
          <div className="div-products">
            <div
              onClick={ this.handleBackToHome }
              className="voltar"
            >
              <img src={ back } alt="voltar" />
              <p className="back-home">Voltar</p>
            </div>
            <div className="car-container">
              <h3 className="title-car">Carrinho de Compras</h3>
              {products.map((product) => (
                <div
                  className="each-product"
                  key={ product.id }
                >
                  <button
                    className="btn-remove-product"
                    data-testid="remove-product"
                    onClick={ () => this.removeProduct(product) }
                  >
                    <IoClose />
                  </button>
                  <img
                    className="img-product"
                    src={ product.pictures }
                    alt={ product.title }
                  />
                  <h3 className="product-name" data-testid="shopping-cart-product-name">
                    {product.title}
                  </h3>
                  <div className="quantity-content">
                    <button
                      className="btn-manage-quantity"
                      data-testid="product-decrease-quantity"
                      onClick={ () => this.handleDecreaseQuantity(product) }
                    >
                      <IoRemove />
                    </button>
                    <p
                      className="quantity-product"
                      data-testid="shopping-cart-product-quantity"
                    >
                      {product.quantity}

                    </p>
                    <button
                      className="btn-manage-quantity"
                      data-testid="product-increase-quantity"
                      onClick={ () => this.handleIncreaseQuantity(product) }
                    >
                      <IoAdd />
                    </button>
                  </div>
                  <h3 className="product-price" data-testid="shopping-cart-product-price">
                    {`R$ ${typeof product.price === 'string'
                   && product.price.includes('.') ? parseFloat(product.price).toFixed(2)
                      : `${parseFloat(product.price).toFixed(2)}`}`}
                  </h3>

                </div>
              ))}
            </div>
          </div>
          <div className="value-total">
            {products.length > 0 && (
              <div>
                <h3 className="title-total">Valor Total da Compra: </h3>
                <h3 className="total-price">
                  R$
                  {' '}
                  {totalPrice.toFixed(2)}
                </h3>
                <Link
                  className="btn-finalizar"
                  data-testid="checkout-products"
                  to="/checkout"
                >
                  Finalizar Compra

                </Link>
              </div>)}
            {products.length === 0 && (
              <h2
                className="empty-car"
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio

              </h2>
            )}
          </div>
        </div>
      </>
    );
  }
}

ShoppingCart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

ShoppingCart.defaultProps = {
  history: {
    push: () => {},
  },
};

export default ShoppingCart;
