/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const dbFoodQuery = require('../db/queries/food_items')

router.get('/', (req, res) => {
  const query1 = `SELECT order_items.id, food_items.name, food_items.price
  FROM order_items
  JOIN food_items ON order_items.food_id = food_items.id; `;
  console.log(query1);

  // const query2 = `SELECT order_items.id, food_items.name, food_items.price
  // FROM order_items
  // JOIN food_items ON order_items.food_id = food_items.id; `;
  // console.log(query2);


// how to hard code certain secnarios to see code is working eg take items off cart

  db.query(query1)
    .then(data => {
      const widgets = data.rows;
      res.json({ widgets });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => { // how does post work with these queries?
  const query = `SELECT order_items.id, food_items.name, food_items.price
  FROM order_items
  JOIN food_items ON order_items.food_id = food_items.id; `;
  console.log(query);
  db.query(query)
    .then(data => {
      const widgets = data.rows;
      res.json({ widgets });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});



module.exports = router;
