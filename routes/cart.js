const express = require('express');
const router  = express.Router();
const foodItemsQueries = require('../db/queries/food_items')
const cartItemQueries = require('../db/queries/cart_items')

router.get('/', (req, res) => {
  cartItemQueries.findCartItem(1)
  .then(cartItems => {
    const templateVars = {
        cartItems
    }
    res.render("cart", templateVars)
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

router.post('/', (req, res) => {
cartItemQueries.addCartItem(3,7)
.then(cartItems => {
  const templateVars = {
      cartItems
  }
  res.render("cart", templateVars)
})
.catch(err => {
  res
    .status(500)
    .json({ error: err.message });
});
});

// router.get('/test', (req, res) => {
//  res.json("this is working my new route")
// });
// });

module.exports = router;
