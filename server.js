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

const mockUsers = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  // Add more users as needed
];

// Routes
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check the user credentials (this is just a mock example)
  const mockUsers = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    // Add more users as needed
  ];

  const user = mockUsers.find((user) => user.username === username && user.password === password);

  if (user) {
    // Successful login, redirect to the main page
    res.redirect('/main');
  } else {
    // Failed login, redirect back to the login page with an error message
    res.render('login', { error: 'Invalid username or password' });
  }
});

app.get('/login/:id', (req, res) => {
  // using encrypted cookies (you need to set up session/cookie middleware)
  req.session.user_id = req.params.id;

  // or using plain-text cookies (you need to set up session/cookie middleware)
  res.cookie('user_id', req.params.id);

  // send the user to the main page (index.ejs)
  res.redirect('index.ejs');
});

app.get('/main', (req,res) => {
  // display food items
  res.render('index');
});

app.get('/users', (req, res) => {
  res.render('/users.ejs');
  // items
});
app.post('/users', (req, res) => {
  // update user page
  res.render('/users.ejs');

});

/**
 Login Page:
GET /login: Display the login page to the user.
Main Page:
GET /main: Display the main page of your food app, showing various food items or categories.
Employees Page (for viewing incoming orders):
GET /employees: Display incoming orders for workers to see.
GET /employees/order/:id: Display details of a specific order with ID :id.
About Page:
GET /about: Display information about your food app or your restaurant.
Cart Page (assuming this is the page where users can view their cart and place orders):
GET /cart: Display the contents of the user's shopping cart.
POST /cart/add: Handle the addition of items to the cart.
POST /cart/remove/:id: Handle the removal of a specific item with ID :id from the cart.
POST /cart/checkout: Handle the checkout process and payment.
 */

