const db = require("../connection");

const getCartItems = () => {
  return db.query("SELECT * FROM order_items;").then((data) => {
    return data.rows;
  });
};

const findCartItem = (itemId) => {
  return db
    .query(
      "SELECT order_items.id, food_items.name, food_items.price FROM order_items JOIN food_items ON order_items.food_id = food_items.id WHERE order_items.id = $1;",
      [itemId]
    ) //DELETE FROM table_name WHERE condition;?
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    });
};

const addCartItem = (item) => {
  return db
    .query(
      `INSERT INTO order_items (food_id, order_id) VALUES ($1, $2) RETURNING *;`,
      [item.food_id, item.order_id]
    )
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    });
};

const deleteCartItem = (itemId) => {
  return db
    .query("DELETE FROM order_items WHERE order_items.id = $1;", [itemId]) //DELETE FROM table_name WHERE condition;?
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    });
};
  // function would accept foodIds as argument
  // function step 1 create the order with (hardcoded?) user id (1)
  // use returning* on the order that was created - still in same function
  // once have ID - add one entry per foodid you have into order_items table
  // every entry into the order_item table will have same order_id but different food_id
  // pool bulk insert - bulk insert means create all in one query
  // otherwise loop over ids to insert
  // once done return out of function
  // once promise resolves then decide res.render / res.etc

  // const addFoodIdsToOrder = function (foodIds, order) {
  //   const orderIdUser = (`Select name From users WHERE name = 'bob';`)
  //   foodIds = req.body.foodIds
  //   return db
  //   .query(`INSERT INTO orders_items (food_id, order_id) VALUES ($1, $2) RETURNING *;`, [foodIds.food_id, ]) //add in sql injection prevention?
  //     .then(data => {
  //       console.log(data.rows)
  //       return data.rows[0];
  //     });
  //   }

    //   const addFoodIdsToOrder = function (foodIds) {
    // // const addFoodIdsToOrder = function (foodIds, order) {
    // // const orderIdUser = (`Select name From users WHERE name = 'bob';`)
    // // foodIds = req.body.foodIds
    // let ids = [];
    // for (let value of foodIds) {
    //   let ids = value;
    //   console.log('ids', ids)
    // }
    //   //console.log('value', value)
    //   return db
    //   .query(`INSERT INTO orders_items (foodIds, order_id) VALUES ([ids], 4) RETURNING *;`) //, [food_id[value], 2]) //add in sql injection prevention?
    //     .then(data => {
    //       console.log(data.rows)
    //       return data.rows[0];
    //     });
    // }


// const addCarttoOrder = function (cartOrder) {
//   return db
//   .query(`INSERT INTO orders (user_id, active, estimated_time_minutes) VALUES ($1, $2, $3) RETURNING *;`, [cartOrder.user_id, cartOrder.active, cartOrder.estimated_time_minutes]) //add in sql injection prevention?
//     .then(data => {
//       console.log(data.rows)
//       return data.rows[0];
//     });
// }
//addCarttoOrder({user_id:1, active:true, estimated_time_minutes: 37});

// deleteCartItem(15);
// any advantage of value const updateCart = (itemId) => {
//   return db
//   .query('SELECT order_items.id, food_items.name, food_items.price FROM order_items JOIN food_items ON order_items.food_id = food_items.id WHERE order_items.id = $1;', [itemId]) //DELETE FROM table_name WHERE condition;?
//     .then(data => {
//       console.log(data.rows)
//       return data.rows;
//     });

module.exports = { getCartItems, findCartItem, addCartItem, deleteCartItem };
