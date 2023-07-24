const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };


// comfortable retrieving data from datables
// add in new files in queries like users.js eg food item query
