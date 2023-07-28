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
    let itemCount = 0;
    for (let i = 0; i < cart.length; i++) {
        itemCount += cart[i].quantity;
    }
    let cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) { // Check if the element exists before attempting to update it
        cartCountElement.innerText = itemCount;
    }
}

function addToCart(itemId) {
    let item = document.getElementById(itemId);
    let title = item.getElementsByTagName('h3')[0].innerText;
    let price = item.getElementsByTagName('p')[0].innerText;
    let imageSrc = item.getElementsByTagName('img')[0].src;
    let existingItemIndex = cart.findIndex(function(cartItem) {
        return cartItem.title === title;
    });

    if (existingItemIndex !== -1) {
        // If item already exists in cart, increase the quantity
        cart[existingItemIndex].quantity++;
    } else {
        // Otherwise, add the item to the cart with quantity 1
        cart.push({title, price, image: imageSrc, quantity: 1, id: parseInt(itemId, 10)});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

document.addEventListener("DOMContentLoaded", function() {
    // Get all the add to cart buttons
    let addToCartButtons = document.querySelectorAll('.submit-button');
    // For each button, add an event listener
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let itemId = button.getAttribute('data-item-id');
            addToCart(itemId);
        });
    });

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            loadCart();
        }
    }
    function loadCart() {
      let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log("stored cart", storedCart);
      let cartItemsElement = document.getElementById('cart-items');
      let totalElement = document.getElementById('total');
      let total = 0;

      cartItemsElement.innerHTML = '';

      for (let i = 0; i < storedCart.length; i++) {
        let itemWrapper = document.createElement('div');
        itemWrapper.classList.add("cart-item");

        let imgElement = document.createElement('img');
        imgElement.src = storedCart[i].image;
        imgElement.style.width = '50px';  // Adjust the width as needed
        itemWrapper.appendChild(imgElement);

        let titleElement = document.createElement('p');
        titleElement.innerText = storedCart[i].title + ' - ' + storedCart[i].price + ' x ' + storedCart[i].quantity;
        itemWrapper.appendChild(titleElement);

        let removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', (function(index) {
          return function() {
            removeFromCart(index);
          }
        })(i));
        itemWrapper.appendChild(removeButton);

        cartItemsElement.appendChild(itemWrapper);

        total += Number(storedCart[i].price.replace(/[^0-9.-]+/g,"")) * storedCart[i].quantity;
      }

      totalElement.innerText = 'Total: $' + total.toFixed(2);
    }


    // Call the loadCart function
    loadCart();
});




//This is outside the DOMContentLoaded event listener
let cartBtn = document.getElementById("cart-btn");
if (cartBtn) {
    cartBtn.onclick = function() {
        window.location.href = 'cart.html'; // maybe use jquery event function then make get request?
    }
}

// call in using function to grab ids to then identify with database
// button place order - unique id to access for script / form
// in script add event listener to button to get all ids from cart - if form  when clicked prevent default
// make ajax post request - sending food ids in req.body - better to send as an array of IDs

// check post route for /orders to call async query function to create order and order_items

// when promise resolves - render a different template for order confirmation on user side



  // Existing users fetching code
  document.getElementById('place-order').addEventListener('click', () => {
    const foodIds = JSON.parse(localStorage.getItem('cart')).map(foodItem => foodItem.id);
    $.ajax({
      method: 'POST',
      url: '/orders',
      data: {foodIds}
    })
    .done((response) => {
      window.location.href = "/cart/checkout1"
      console.log("response", response)
    })
    .catch(err => {
      console.error(err);
    })
  });
