const express = require('express');
const router  = express.Router();
const foodItemsQueries = require('../db/queries/food_items')
const cartItemQueries = require('../db/queries/cart_items')

// "/" represents router handler path to /cart1
router.get('/', (req, res) => {
  res.render('cart1');
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
//const accountSid = '';
//const authToken = '';

//const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//     body: 'Order confirmed waiting for approval',
//     to: '', // Text your number
//     from: '', // From a valid Twilio number
//   })
//   .then((message) => console.log(message.sid));


   res.redirect('/cart1/checkout1'); // redirect is user side whole url
 });


router.get('/checkout1', (req, res) => {
  res.render('checkout1');
});

router.post('/checkout1', (req, res) => {
  res.redirect('/index1');
});

//   const inputContinueShopping = req.body.continue;
//   const inputProceedCheckout = req.body.proceed;


// });


//router.get('/', (req, res) => {
  // cartItemQueries.findCartItem(1)
  // .then(cartItems => {
  //   const templateVars = {
  //       cartItems
  //   }
  //   res.render("cart", templateVars)
  // })
  // .catch(err => {
  //   res
  //     .status(500)
  //     .json({ error: err.message });
  // });

//});

//router.post('/', (req, res) => {
// cartItemQueries.addCartItem(3,7)
// .then(cartItems => {
//   const templateVars = {
//       cartItems
//   }
//   res.render("cart", templateVars)
// })
// .catch(err => {
//   res
//     .status(500)
//     .json({ error: err.message });
// });
//});

// router.get('/test', (req, res) => {
//  res.json("this is working my new route")
// });
// });

module.exports = router;
