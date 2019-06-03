var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', {
    title: 'Takeit.com',
    logged: false
  });
});
router.post('/', function (req, res, next) {
  res.render('resultados', {
    title: 'Resultados',
    logged: false
  })
})


router.get('/nosotros', function (req, res, next) {
  res.render('ondev', {
    title: 'On Dev',
    logged: false
  })
})



router.get('/resultados', function(req, res, next){
  res.render('resultados', {
    title: 'Resultados',
    logged: false
  })
})
router.post('/resultados', function(req, res, next){
  res.render('resultados', {
    title: 'Resultados',
    logged: false
  })
})

module.exports = router;