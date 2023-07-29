/*
 * All routes for Order Data are defined here
 * Since this file is loaded in server.js into api/orders,
 *   these routes are mounted onto /api/orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const orderQueries = require('../db/queries/orders');
// getOrders, acceptOrder, rejectOrder, completeOrder, cancelOrder
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


router.get('/', (req, res) => {
  orderQueries.getOrders()
    .then(orders => {
      res.json({ orders });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/food/:id', (req, res) => {
  const id = req.params.id;
  orderQueries.getOrderItems(id)
    .then(orderItems => {
      res.json({ orderItems });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  const {orderId, buttonType} = req.body;
  console.log(req.body)
  console.log(orderId)
  console.log(buttonType)
  orderQueries[`${buttonType}Order`](orderId)
  .then(() => {
    console.log('it worked?')
    if (buttonType === 'accept') {
      console.log('your food is cooking')
      client.messages
      .create({
        body: 'your food is cooking',
        to: process.env.PERSONAL_NUMBER, // Text your number
        from: process.env.TWILLIO_NUMBER, // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
    }
    else if (buttonType === 'complete') {
      console.log('your order is complete, delivery ETA: 123')
      client.messages
      .create({
        body: 'your order is complete, delivery ETA: 123',
        to: process.env.PERSONAL_NUMBER, // Text your number
        from: process.env.TWILLIO_NUMBER, // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
    }
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
