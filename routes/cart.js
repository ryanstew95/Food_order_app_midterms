const express = require("express");
const router = express.Router();
const foodItemsQueries = require('../db/queries/food_items')
const cartItemQueries = require('../db/queries/cart_items')

// "/" represents router handler path to /cart1
router.get('/', (req, res) => {
  res.render('cart');
});

router.post('/', (req, res) => {

  });


router.get('/checkout1', (req, res) => {
  res.render('checkout1');
});

router.post('/checkout1', (req, res) => {
  res.redirect('index');
});


router.get("/", (req, res) => {
  cartItemQueries
    .findCartItem(1)
    .then((cartItems) => {
      const templateVars = {
        cartItems,
      };
      res.render("cart", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", (req, res) => {
  console.log('req_body:', req.body);
  cartItemQueries
    .addCartItem(3, 7)
    .then((cartItems) => {
      const templateVars = {
        cartItems,
      };
      res.status(200);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


module.exports = router;
