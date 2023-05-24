export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const jsonData = await response.json();
  return jsonData;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const searchCategoryIdAndQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const jsonData = await searchCategoryIdAndQuery.json();
  return jsonData;
}

export async function getProductById(id) {
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const jsonData = await response.json();
  return jsonData;
}
