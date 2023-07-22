var cart = [];

function addToCart(itemId) {
  var item = document.getElementById(itemId);
  var title = item.getElementsByTagName('h3')[0].innerText;
  var price = item.getElementsByTagName('p')[0].innerText;
  cart.push({title: title, price: price});
  console.log(cart);
  updateCartCount();
}

function updateCartCount() {
  var cartCountElement = document.getElementById('cart-count');
  cartCountElement.innerText = cart.length;
}
