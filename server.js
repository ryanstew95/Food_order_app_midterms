const { Pool } = require('pg');
// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Set up session middleware
app.use(
  session({
    secret: 'tyh6v3rg',
    resave: false,
    saveUninitialized: true,
  })
);


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// listener
app.listen(PORT, () => {
  console.log(`food order app listening on port ${PORT}`);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////
// LOGIN //
///////////////////////////////////////////////////////////////////////////////////////////////////////
const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'midterm',
  password: 'labber',
  port: 5432,
});

app.post('/login', async (req, res) => {
  const { user_id } = req.body;
  console.log('User ID:', user_id);

  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [user_id]);

    if (result.rows.length === 1) {
      // Get the user object from the query result
      const user = result.rows[0];

      if (user.isemployee) {
        // User is an employee, render the order page
        res.redirect('/orders');
      } else {
        // User is not an employee, render the main page
        res.render('index', { user });
      }
    } else {
      // Failed login, redirect back to the login page with an error message
      res.status(400).send('Invalid user ID. Please try again.');
    }
  } catch (error) {
    console.error('Error executing the query:', error);
    res.render('login', { error: 'An error occurred. Please try again later.' });
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////
// LOGIN //
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
// ORDERS //
///////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/orders', async (req, res) => {
  try {
    // Fetch all rows from the orders table
    const query = 'SELECT * FROM orders';
    const result = await pool.query(query);
    const orders = result.rows;

    console.log('orders:', orders);

    // Render the 'orders.ejs' template and pass the orders data
    res.render('orders', { orders }); // Change 'users' to 'orders'
  } catch (error) {
    console.error('Error executing the query:', error);
    res.render('orders', { orders: [], error: 'An error occurred while fetching orders.' }); // Change 'users' to 'orders'
  }
});
// Route to display a specific order by its id
app.get('/orders/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    // Fetch the order from the orders table by its id
    const query = 'SELECT * FROM orders WHERE id = $1';
    const result = await pool.query(query, [orderId]);
    const orders = result.rows[0];

    // Render the 'order.ejs' template and pass the order data
    res.render('orders', { orders });
  } catch (error) {
    console.error('Error executing the query:', error);
    res.render('orders', { orders: null, error: 'An error occurred while fetching the order.' });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// ORDERS //
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
// MAIN //
///////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/main', async (req, res) => {
  const { user } = req.session;
  res.render('index', { user });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////
// MAIN //
///////////////////////////////////////////////////////////////////////////////////////////////////////
// Add the sign-out route
app.post('/logout', (req, res) => {
  // Destroy the session to sign the user out
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    // Redirect the user back to the main page after signing out
    res.redirect('/main');
  });
});
/**
 Login Page:
[x] GET /login: Display the login page to the user.
[x] POST /login: Handle the form submission when the user tries to log in.
Main Page:
[x] GET /main: Display the main page of your food app, showing various food items or categories.
Orders Page (for viewing incoming orders):
[x] GET /orders: Display incoming orders for workers to see.
[] GET /orders/:id: Display details of a specific order with ID :id.
About Page:
[] GET /about: Display information about your food app or your restaurant.
Cart Page (assuming this is the page where users can view their cart and place orders):
[] GET /cart: Display the contents of the user's shopping cart.
[] POST /cart/add: Handle the addition of items to the cart.
[] POST /cart/remove/:id: Handle the removal of a specific item with ID :id from the cart.
[] POST /cart/checkout: Handle the checkout process and payment.
 */

