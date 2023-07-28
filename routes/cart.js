const express = require("express");
const router = express.Router();
const foodItemsQueries = require('../db/queries/food_items')
const cartItemQueries = require('../db/queries/cart_items')

// "/" represents router handler path to /cart1
router.get('/', (req, res) => {
  res.render('cart');
});

router.post('/', (req, res) => {




//   cartItemQueries.addCarttoOrder(3, true, 20)
//     .then(addOrder => {
//       res.json({ addOrder });
//     })
// .catch(err => {
//   res
//     .status(500)
//     .json({ error: err.message });
// });

  //twillio logic{}
 //Your AccountSID and Auth Token from console.twilio.com
//  const accountSid = 'AC204fe2dfb1c7b5af180b4677047497cc';
//  const authToken = '7fd76b24ca21814ec5d0ec342f93d4f9';

//  const client = require('twilio')(accountSid, authToken);

//  client.messages
//    .create({
//      body: 'Order confirmed waiting for approval',
//      to: '+16047543274', // Text your number
//      from: '+12296000956', // From a valid Twilio number
//    })
//    .then((message) => console.log(message.sid));



  //  res.redirect('/cart/checkout1'); // redirect is user side whole url
  });


router.get('/checkout1', (req, res) => {
  res.render('checkout1');
});

router.post('/checkout1', (req, res) => {
  // res.redirect('/index');
});




// const foodItemsQueries = require("../db/queries/food_items");
// const cartItemQueries = require("../db/queries/cart_items");

// router.get("/", (req, res) => {
//   cartItemQueries
//     .findCartItem(1)
//     .then((cartItems) => {
//       const templateVars = {
//         cartItems,
//       };
//       res.render("cart", templateVars);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });

// router.post("/", (req, res) => {
//   console.log('req_body:', req.body);
//   cartItemQueries
//     .addCartItem(3, 7)
//     .then((cartItems) => {
//       const templateVars = {
//         cartItems,
//       };
//       res.status(200);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });


module.exports = router;
