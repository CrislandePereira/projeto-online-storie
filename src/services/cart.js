export function addToCart(product, quantity) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartAndNewProduct = [...cart, { ...product, quantity }];
  localStorage.setItem('cart', JSON.stringify(cartAndNewProduct));
}

export function removeToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartWhithoutProduct = cart.filter((item) => item.id !== product.id);
  localStorage.setItem('cart', JSON.stringify(cartWhithoutProduct));
}

export function getCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart;
}

export function clearCart() {
  localStorage.removeItem('cart');
}

export function updateCart(product, quantity) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartWhithoutProduct = cart.filter((item) => item.id !== product.id);
  const cartAndNewProduct = [...cartWhithoutProduct, { ...product, quantity }];
  localStorage.setItem('cart', JSON.stringify(cartAndNewProduct));
}

export function getProductByIdCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(cart);
  const product = cart.find((item) => item.id === id);
  return product;
}

export function getTotalPrice() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  return total;
}
