const db = require('../connection');

const getOrders = () => {
  return db.query(`
  SELECT * FROM ORDERS
  ;`)
    .then(data => {
      console.log(data.rows)
      return data.rows;
    });
};
const getOrderItems = (id) => {
  return db.query(`
  SELECT food_items.name FROM food_items
  JOIN order_items on order_items.food_id = food_items.id
  WHERE order_id = ${id}
  ;`)
    .then(data => {
      const foodList = [];
      for (const foodItem of data.rows) {
        foodList.push(foodItem.name);
      }
      return foodList;
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

const acceptOrder = (id) => {
  return db.query(`
  UPDATE orders
  SET date_accepted='NOW()'
  WHERE orders.id = ${id};`)
    .then(data => {
      console.log(data.rows)
      return data.rows;
    });
};

const rejectOrder = (id) => {
  return db.query(`
  UPDATE orders
  SET active='false'
  WHERE orders.id = ${id};`)
    .then(data => {
      console.log(data.rows)
      return data.rows;
    });
};

const completeOrder = (id) => {
  return db.query(`
  UPDATE orders
  SET date_completed='NOW()',
      active='false'
  WHERE orders.id = ${id};`)
    .then(data => {
      console.log(data.rows)
      return data.rows;
    });
};

const cancelOrder = (id) => {
  return db.query(`
  UPDATE orders
  SET active='false'
  WHERE orders.id = ${id};`)
    .then(data => {
      console.log(data.rows)
      return data.rows;
    });
};

module.exports = { getOrders, getOrderItems, createOrder, createOrderItems, acceptOrder, rejectOrder, completeOrder, cancelOrder };
