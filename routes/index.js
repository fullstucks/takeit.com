var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', {
    title: 'Takeit.com',
    logged: false
  });
});

module.exports = router;