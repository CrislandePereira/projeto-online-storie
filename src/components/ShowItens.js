/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { getCart, removeToCart, getTotalPrice } from '../services/cart';
import back from '../assets/back.svg';
import './ShowItens.css';

class ShowItens extends React.Component {
  state = {
    products: [{
      pictures: '',
      title: '',
      price: 0,
      id: '',
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
  };

  handlGetTotalPrice = () => {
    const totalPrice = getTotalPrice();
    this.setState((prevState) => ({
      ...prevState,
      totalPrice,
    }));
  };

  handleBackToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { products, totalPrice } = this.state;
    return (
      <div className="show-itens">
        <div
          className="voltar-home"
          onClick={ this.handleBackToHome }
        >
          <img src={ back } alt="voltar" />
          <p className="back-home">Voltar</p>
        </div>
        <div className="products-revision">
          <h1 className="title-revision">Revise seus produtos</h1>
          {products.map((product) => (
            <div className="each-product-finaly" key={ product.id }>
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
              <p className="prod-name" key={ product.title }>
                {product.title}
              </p>
              <p className="product-price">
                {`R$ ${typeof product.price === 'string'
                   && product.price.includes('.') ? parseFloat(product.price).toFixed(2)
                  : `${parseFloat(product.price).toFixed(2)}`}`}
              </p>
            </div>)) }
          <h3 className="total-finaly">Total:</h3>
          <h3 className="total-finaly">
            R$
            {' '}
            {totalPrice.toFixed(2)}
          </h3>
        </div>
      </div>
    );
  }
}

ShowItens.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

ShowItens.defaultProps = {
  history: {
    push: () => {},
  },
};

export default ShowItens;
