const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {

  res.render('index1');
});

router.post('/', (req, res) => {
  res.redirect('/cart1');
});







module.exports = router;
