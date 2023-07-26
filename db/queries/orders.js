const db = require('../connection');

const getOrders = () => {
  return db.query('SELECT * FROM orders;')
    .then(data => {
      console.log(data.rows)
      return data.rows;
    });
};

module.exports = { getOrders };
