/* eslint-disable react/jsx-max-depth */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { getProductById } from '../services/api';
import { addToCart } from '../services/cart';
import { FormFeedback } from '../components/FormFeedback';
import { Feedback } from '../components/Feedback';
import { addFeedback, getFeedbacksByProductId } from '../services/feedback';
import Header from '../components/Header';
import back from '../assets/back.svg';
import './ProductDetail.css';

class ProductDetail extends Component {
  state = {
    product: {
      price: 0,
      pictures: '',
      title: '',
      id: '',
      attributes: [],
      quantity: 0,
    },
    feedbacks: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getProductById(id)
      .then((data) => {
        const feedbacks = getFeedbacksByProductId(data.id);
        this.setState({
          product: {
            price: data.price,
            pictures: data.pictures[0].url,
            title: data.title,
            id: data.id,
            attributes: data.attributes,
            quantity: 1,
          },
          feedbacks,
        });
      });
  }

  increaseQuantity = () => {
    const { product } = this.state;
    if (product.quantity > 0) {
      this.setState((prevState) => ({
        ...prevState,
        product: {
          ...prevState.product,
          quantity: prevState.product.quantity + 1,
        },
      }));
    }
  };

  decreaseQuantity = () => {
    const { product } = this.state;
    if (product.quantity > 0) {
      this.setState((prevState) => ({
        ...prevState,
        product: {
          ...prevState.product,
          quantity: prevState.product.quantity - 1,
        },
      }));
    }
  };

  handleClickAddToCart = () => {
    const { product } = this.state;
    addToCart(product, 1);
    const { history } = this.props;
    history.push('/shopping-cart');
  };

  handleBackToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  formatEspeficationsMaxThirtyLines = (attributes) => {
    const thirty = 30;
    const attributesMaxThirtyLines = attributes.slice(0, thirty);
    return attributesMaxThirtyLines;
  };

  handleSendFeedback = (feedback) => {
    const { product } = this.state;
    this.setState((prevState) => ({
      feedbacks: [...prevState.feedbacks, feedback],
    }));
    addFeedback(feedback, product.id);
  };

  handleSearch = (search) => {
    const { history } = this.props;
    history.push(`/?q=${search}`);
  };

  render() {
    const { product, feedbacks } = this.state;
    const { price, pictures, title, attributes, quantity } = product;
    return (
      <>
        <Header onSearch={ this.handleSearch } />
        <div className="page-container">
          <div className="right" onClick={ this.handleBackToHome }>
            <div className="voltar">
              <img src={ back } alt="voltar" />
              <p className="back-home">Voltar</p>
            </div>
            <div className="product-image">
              <h1 className="title" data-testid="product-detail-name">{title}</h1>
              <img data-testid="product-detail-image" src={ pictures } alt="" />
            </div>
          </div>

          <div className="left">
            <h1 className="title-especificacoes">Especificações Técnicas</h1>
            <ul className="product-attributes">
              {this.formatEspeficationsMaxThirtyLines(attributes).map((attribute) => (
                <li key={ attribute.name }>
                  {`${attribute.name}: ${attribute.value_name}`}
                </li>
              ))}
            </ul>
            <div className="price-btnCar">
              <h3 className="price" data-testid="product-detail-price">
                {`R$ ${typeof price === 'string'
                   && price.includes('.') ? parseFloat(price).toFixed(2)
                  : `${parseFloat(price).toFixed(2)}`}`}

              </h3>
              <div className="quantity-content">
                <button
                  className="btn-manage-quantity"
                  data-testid="product-decrease-quantity"
                  onClick={ this.decreaseQuantity }
                >
                  <IoRemove />
                </button>

                <p
                  className="quant-number"
                  data-testid="shopping-cart-product-quantity"
                >
                  {quantity}

                </p>
                <button
                  className="btn-manage-quantity"
                  data-testid="product-increase-quantity"
                  onClick={ this.increaseQuantity }
                >
                  <IoAdd />
                </button>
              </div>
              <button
                className="button-add-cart"
                onClick={ this.handleClickAddToCart }
                data-testid="product-detail-add-to-cart"
              >
                Adicionar ao Carrinho

              </button>
            </div>
          </div>
        </div>
        <div className="feedback-container">
          <FormFeedback
            onSend={ this.handleSendFeedback }
          />
          { feedbacks.map((feedback) => (
            <Feedback
              name={ feedback.email }
              score={ parseInt(feedback.rating, 10) }
              message={ feedback.text }
              key={ feedback.email }
            />
          ))}
        </div>
      </>
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
