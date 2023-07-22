const db = require('../connection');

const getCartItems = () => {
  return db.query('SELECT * FROM order_items;')
    .then(data => {
      return data.rows;
    });
};


const findCartItem = (itemId) => {
  return db
  .query('SELECT order_items.id, food_items.name, food_items.price FROM order_items JOIN food_items ON order_items.food_id = food_items.id WHERE order_items.id = $1;', [itemId]) //DELETE FROM table_name WHERE condition;?
    .then(data => {
      return data.rows;
    });
};



module.exports = { getCartItems, findCartItem };
