const db = require('../connection');

const getOrders = () => {
  return db.query('SELECT * FROM orders;')
    .then(data => {
      console.log(data.rows)
      return data.rows;
    });
};

const createOrder = (userId, est) => {
  return db.query(`INSERT into orders (user_id, estimated_time_minutes) VALUES ($1, $2) RETURNING *;`,
  [userId, est])
  .then(data => {
    console.log(data.rows[0])
    return data.rows[0];
  });
}

const createOrderItems = (foodIds, orderId) => {
  let query = 'INSERT into order_items (food_id, order_id) VALUES ';
  const paramArray = [];
  for (let index in foodIds) {
    let value1 = ((+index + 1 ) * 2) - 1;
    let value2 = ((+index + 1 ) * 2);

    //((index + 1 ) * 2) - 1
    //((index + 1 ) * 2)
    console.log("index", index)
    if(index != 0){
      query += `,`;
    }
    query += `($${value1}, $${value2})`
    paramArray.push(foodIds[index]);
    paramArray.push(orderId);
  }
  query += ` RETURNING *;`;
  console.log("query", query);
  return db.query(query, paramArray)
  .then(data => {
    console.log(data.rows)
    return data.rows;
  });
}

module.exports = { getOrders, createOrder, createOrderItems };
