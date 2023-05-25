import React from 'react';
import { getCart } from '../services/cart';

class ShowItens extends React.Component {
  state = {
    products: [{
      pictures: '',
      title: '',
      price: 0,
      id: '',
    //   quantity: 0,
    }],
  };

  componentDidMount() {
    const { products } = this.state;
    const cartProducts = getCart();
    this.setState({ products: cartProducts });
    console.log(products);
  }

  //   removeProduct = (product) => {
  //     removeToCart(product);
  //     const cartProducts = getCart();
  //     this.setState({ products: cartProducts });
  //   };

  render() {
    const { products } = this.state;
    return (
      <div>
        <h1>Revise seus produtos</h1>
        {products.map((product) => (
          <div key={ product.id }>
            <img src={ product.pictures } alt={ product.title } />
            <p key={ product.title }>
              {' '}
              {product.title}
              {' '}
            </p>
            <p>
              R$
              {' '}
              {product.price}
            </p>
          </div>)) }
        <h3>Total:</h3>
      </div>

    );
  }
}

export default ShowItens;
