import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import './ProductList.css';
import { addToCart } from '../services/cart';

export function ProductList() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [hasSearch, setHasSearch] = useState(false);

  const takeCategories = () => {
    getCategories().then((data) => {
      setCategories(data);
    });
  };
  useEffect(() => {
    takeCategories();
  }, []);

  const handleClick = () => {
    const input = document.querySelector('input');
    const { value } = input;

    getProductsFromCategoryAndQuery(null, value)
      .then((data) => setProducts(data.results))
      .finally(() => setHasSearch(true));
  };
  const handleClickCategory = (categoryId) => {
    getProductsFromCategoryAndQuery(categoryId, null)
      .then((data) => setProducts(data.results));
  };
  const addLocalStorage = (product) => {
    console.log(product);
    const productFormat = {
      price: product.price,
      pictures: product.thumbnail,
      title: product.title,
      id: product.id,
    };
    addToCart(productFormat, 1);
  };

  return (
    <>
      <div className="search">
        <input
          name="productSearch"
          data-testid="query-input"
          type="text"
        />
        <button
          onClick={ handleClick }
          data-testid="query-button"
          type="button"
        >
          {' '}
          Pesquisar

        </button>
        <Link to="/shopping-cart">
          <button data-testid="shopping-cart-button">
            Carrinho de Compras
          </button>
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
      <div className="category">
        {categories.map((category) => (
          <button
            data-testid="category"
            key={ category.name }
            onClick={ () => handleClickCategory(category.id) }
          >
            {category.name}

          </button>
        ))}
      </div>
      <div className="product-container">
        {products.map((product) => (
          <div
            className="card"
            key={ product.id }
          >
            <Link
              key={ product.id }
              to={ `/product-detail/${product.id}` }
              data-testid="product-detail-link"
            >
              <h2 data-testid="product" key={ product.id }>{product.title}</h2>
            </Link>
            <button
              data-testid="product-add-to-cart"
              onClick={ () => addLocalStorage(product) }
            >
              Adicionar ao Carrinho

            </button>
          </div>
        ))}
        {products.length === 0 && hasSearch && (<p>Nenhum produto foi encontrado</p>) }
      </div>
    </>
  );
}
