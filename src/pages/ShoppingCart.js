import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeToCart, updateCart } from '../services/cart';

class ShoppingCart extends Component {
  state = {
    products: [{
      pictures: '',
      title: '',
      price: 0,
      id: '',
      quantity: 0,
    }],
  };

  componentDidMount() {
    const cartProducts = getCart();
    this.setState({ products: cartProducts });
  }

  removeProduct = (product) => {
    removeToCart(product);
    const cartProducts = getCart();
    this.setState({ products: cartProducts });
  };

  handleIncreaseQuantity = (product) => {
    const { quantity } = product;
    const newQuantity = quantity + 1;
    updateCart(product, newQuantity);
    const cartProducts = getCart();
    this.setState({ products: cartProducts });
  };

  handleDecreaseQuantity = (product) => {
    const { quantity } = product;
    const newQuantity = quantity - 1;
    updateCart(product, newQuantity);
    const cartProducts = getCart();
    this.setState({ products: cartProducts });
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        <Link to="/shopping-cart">
          <button data-testid="shopping-cart-button">
            Carrinho de Compras
          </button>
        </Link>
        {products.map((product) => (
          <div key={ product.id }>
            <img src={ product.pictures } alt="" />
            <h3 data-testid="shopping-cart-product-name">
              {product.title}
            </h3>
            <button
              data-testid="product-increase-quantity"
              onClick={ () => this.handleIncreaseQuantity(product) }
            >
              +
            </button>
            <p data-testid="shopping-cart-product-quantity">{product.quantity}</p>
            <button
              data-testid="product-decrease-quantity"
              onClick={ () => this.handleDecreaseQuantity(product) }
            >
              -
            </button>
            <button
              data-testid="remove-product"
              onClick={ () => this.removeProduct(product) }
            >
              X
            </button>
          </div>
        ))}
        {products.length === 0 && (
          <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
        )}
      </div>
    );
  }
}

export default ShoppingCart;
