// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
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

// routes
app.get('/login', (req, res) => {
  res.render('index.ejs');
  //login submit forumn
});
app.get('/login/:id', (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  // or using plain-text cookies
  res.cookie('user_id', req.params.id);

  // send the user to main page
  res.redirect('/users.ejs');
//
});
app.get('/users', (req, res) => {
  res.render('/users.ejs');
  // items
});
app.post('/users', (req, res) => {
  // update user page
  res.render('/users.ejs');

});
// psuedo code
//users page
//logging in - get
// -main page - get
// creating order -

// action between the user and employee

//employees
// login / shows order - get -- hard coded isEmployee



// (Browse, Read, Edit, Add, Delete)
// /                                              - login
// B - Get /Users 	            – render page
// R - Get /Users/:id 	        – load food information for selected food type
// E - Post /Users/:id                  – edit food information(stretch)
// A - Post/Users  	            – create order

