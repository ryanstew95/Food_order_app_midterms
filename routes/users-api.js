/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");
const foodItemsQueries = require("../db/queries/food_items");
const cartItemQueries = require("../db/queries/cart_items");
// router.get('/', (req, res) => {
//   foodItemsQueries.getFoodItems()
//   .then(users => {
//     res.json({ users });
//   })
//   .catch(err => {
//     res
//       .status(500)
//       .json({ error: err.message });
//   });

//   userQueries.getUsers()
//     .then(users => {
//       res.json({ users });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

router.get("/", (req, res) => {
  cartItemQueries
    .findCartItem(1)
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// router.post
// utilize queries into here similar to
// use postman / rested plugin chrome plugin / similar to commandline curl

module.exports = router;
