/*
 * All routes for Orders are defined here
 * Since this file is loaded in server.js into /orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const cartToOrder = require('../db/queries/cart_items');
const { createOrder, createOrderItems, acceptOrder, rejectOrder, completeOrder, cancelOrder } = require('../db/queries/orders');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

router.get('/', (req, res) => {
  res.render('orders');
});

router.post('/', (req, res) => {
  if (!req.body.foodIds) {
    console.log('update the order')
  }
  console.log("req.body", req.body);
  const foodIds = req.body.foodIds.map(id => parseInt(id, 10));
  console.log("foodIds", foodIds);

  createOrder(1, 15)// add in actual values?
    .then(order => {
      console.log("order", order);
      return createOrderItems(foodIds, order.id);
      //res.json({ cart });
    })
    .then(cart => {
      console.log("cart", cart);
      //client.messages
      //  .create({
      //    body: 'Order confirmed waiting for approval',
      //    to: process.env.PERSONAL_NUMBER, // Text your number
      //    from: process.env.TWILLIO_NUMBER, // From a valid Twilio number
      //  })
      //  .then((message) => console.log(message.sid));
      //res.json({ cart });
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: err.message });
    });


  // cartToOrder.addFoodIdsToOrder(foodIds)
  // .then(cart => {
  //   console.log("cart", cart);
  //   //res.json({ cart });
  // })
  // .catch(err => {
  //   res
  //     .status(500)
  //     .json({ error: err.message });
  // });
});

module.exports = router;
