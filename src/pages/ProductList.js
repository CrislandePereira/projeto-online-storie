import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Header from '../components/Header';
import { addToCart } from '../services/cart';
import './ProductList.css';

export function ProductList({ history }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [hasSearch, setHasSearch] = useState(false);

  const handleSearch = (search) => {
    getProductsFromCategoryAndQuery(null, search)
      .then((data) => setProducts(data.results))
      .finally(() => setHasSearch(true));
  };

  const takeCategories = () => {
    getCategories().then((data) => {
      setCategories(data);
    });
  };
  useEffect(() => {
    takeCategories();
    const query = window.location.search;
    if (query) {
      const q = new URLSearchParams(query).get('q');
      console.log(q);
      handleSearch(q);
    }
  }, []);

  const handleClickCategory = (categoryId) => {
    getProductsFromCategoryAndQuery(categoryId, null)
      .then((data) => setProducts(data.results));
  };
  const addLocalStorage = (product) => {
    const productFormat = {
      price: product.price,
      pictures: product.thumbnail,
      title: product.title,
      id: product.id,
    };
    addToCart(productFormat, 1);
    history.push('/shopping-cart');
  };

  return (
    <>
      <Header onSearch={ handleSearch } />
      <div className="page-container">
        <div className="category">
          <h2 className="title-category">Categorias</h2>
          <span className="line" />
          {categories.map((category) => (
            <button
              className="button-category"
              data-testid="category"
              key={ category.name }
              onClick={ () => handleClickCategory(category.id) }
            >
              {category.name}

            </button>
          ))}
        </div>
        <div className="product-container">
          {products.length === 0 && !hasSearch && (
            <div className="message-container">
              <h3 className="title-message">VOCÊ AINDA NÃO REALIZOU NENHUMA BUSCA</h3>
              <p className="message" data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            </div>
          )}
          {products.length === 0 && hasSearch && (
            <div className="message-container">
              <h3 className="title-message">Nenhum produto foi encontrado</h3>
              <p className="message" data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            </div>
          )}
          {products.map((product) => (
            <div className="card" key={ product.id }>
              <Link
                key={ product.id }
                to={ `/product-detail/${product.id}` }
                data-testid="product-detail-link"
              >
                <img
                  className="image-product"
                  src={ product.thumbnail }
                  alt={ product.title }
                />
                <h2 className="title-product" data-testid="product" key={ product.id }>
                  {product.title}
                </h2>
                <h3 className="price" data-testid="product-price">
                  {`R$ ${typeof product.price === 'string'
                   && product.price.includes('.') ? parseFloat(product.price).toFixed(2)
                    : `${parseFloat(product.price).toFixed(2)}`}`}
                </h3>
              </Link>
              <button
                className="button-add-cart"
                data-testid="product-add-to-cart"
                onClick={ () => addLocalStorage(product) }
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

ProductList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
