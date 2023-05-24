import { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import { addToCart } from '../services/cart';

class ProductDetail extends Component {
  state = {
    product: {
      price: 0,
      pictures: '',
      title: '',
      id: '',
    },
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    console.log(id);
    getProductById(id)
      .then((data) => {
        console.log(data);
        this.setState({
          product: {
            price: data.price,
            pictures: data.pictures[0].url,
            title: data.title,
            id: data.id,
          },
        });
      });
  }

  handleClickCart = () => {
    const { history } = this.props;
    history.push('/shopping-cart');
  };

  handleClickAddToCart = () => {
    const { product } = this.state;
    addToCart(product, 1);
  };

  render() {
    const { product } = this.state;
    const { price, pictures, title } = product;
    return (
      <div>
        <h1 data-testid="product-detail-name">{title}</h1>
        <img data-testid="product-detail-image" src={ pictures } alt="" />
        <h3 data-testid="product-detail-price">{ price }</h3>
        <button
          onClick={ this.handleClickCart }
          data-testid="shopping-cart-button"
        >
          Carrinho

        </button>
        <button
          onClick={ this.handleClickAddToCart }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao Carrinho

        </button>

      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
ProductDetail.defaultProps = {
  history: {
    push: () => {},
  },
};

export default ProductDetail;
