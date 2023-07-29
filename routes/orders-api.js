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

router.post('/', (req, res) => {
  const {orderId, buttonType} = req.body;
  console.log(req.body)
  console.log(orderId)
  console.log(buttonType)
  orderQueries[`${buttonType}Order`](orderId)
  .then(() => {
    console.log('it worked?')
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
