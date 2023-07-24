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

// deleteCartItem(15);
// any advantage of value const updateCart = (itemId) => {
//   return db
//   .query('SELECT order_items.id, food_items.name, food_items.price FROM order_items JOIN food_items ON order_items.food_id = food_items.id WHERE order_items.id = $1;', [itemId]) //DELETE FROM table_name WHERE condition;?
//     .then(data => {
//       console.log(data.rows)
//       return data.rows;
//     });

module.exports = { getCartItems, findCartItem, addCartItem, deleteCartItem };
