var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', {
        title: 'Takeit.com - Home',
        logged: false
    });
});


router.post('/', function(req, res, next) {
    res.render('results', {
        title: 'Resultados',
        logged: false
    })
})


router.get('/nosotros', function(req, res, next) {
    res.render('ondev', {
        title: 'Takeit.com - On Dev',
        logged: false
    })
})


router.get('/reservasRealizadas', function(req, res, next) {
    res.render('reservasRealizadas', {
        title: 'Takeit.com - Tus Reservas',
        logged: true
    })
})

router.get('/resultados', function(req, res, next) {
    res.render('resultados', {
        title: 'Takeit.com - Resultados',
        logged: false
    })
})
router.post('/resultados', function(req, res, next) {
    res.render('resultados', {
        title: 'Takeit.com - Resultados',
        logged: false
    })
})

router.get('/administracion', function(req, res, next) {
    res.render('administracion', {
        title: 'Takeit.com - Panel Administrativo',
        logged: true
    })
})

router.get('/confirmacion', function(req, res, next) {
    res.render('confirmacion')
})
router.get('/infoRestaurante', function(req, res, next) {
    res.render('infoRestaurante')
})
router.get('/seleccionarEntradas', function(req, res, next) {
    res.render('seleccionarEntradas')
})
router.get('/seleccionarMesa', function(req, res, next) {
    res.render('seleccionarMesa')
})
router.get('/pago', function(req, res, next) {
    res.render('pago')
})


module.exports = router;