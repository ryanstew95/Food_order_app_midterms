let cart = [];
// there's two addToCart functions
// function addToCart(itemId) {
//   let item = document.getElementById(itemId);
//   var title = item.getElementsByTagName("h3")[0].innerText;
//   var price = item.getElementsByTagName("p")[0].innerText;
//   cart.push({ title: title, price: price });
//   console.log(cart);
//   updateCartCount();
// }

function updateCartCount() {
  var cartCountElement = document.getElementById("cart-count");
  cartCountElement.innerText = cart.length;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
}
function updateCartCount() {
  let itemCount = 0;
  for (let i = 0; i < cart.length; i++) {
    itemCount += cart[i].quantity;
  }
  let cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    // Check if the element exists before attempting to update it
    cartCountElement.innerText = itemCount;
  }
}

function addToCart(itemId) {
  let item = document.getElementById(itemId);
  let title = item.getElementsByTagName("h3")[0].innerText;
  let price = item.getElementsByTagName("p")[0].innerText;
  let imageSrc = item.getElementsByTagName("img")[0].src;
  let existingItemIndex = cart.findIndex(function (cartItem) {
    return cartItem.title === title;
  });

  if (existingItemIndex !== -1) {
    // If item already exists in cart, increase the quantity
    cart[existingItemIndex].quantity++;
  } else {
    // Otherwise, add the item to the cart with quantity 1
    cart.push({ title: title, price: price, image: imageSrc, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", function () {
  // Get all the add to cart buttons
  let addToCartButtons = document.querySelectorAll(".submit-button");
  // For each button, add an event listener
  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      let itemId = button.getAttribute("data-item-id");
      addToCart(itemId);
    });
  });

});
