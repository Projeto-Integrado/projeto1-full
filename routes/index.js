var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Vamos Crescer' });
});

router.get('/index.html', function(req, res, next) {
    res.render('index', { title: 'Vamos Crescer' });
});

router.get('/sobre.html', function(req, res, next) {
    res.render('sobre', { title: 'Vamos Crescer' });
});

router.get('/calculadora.html', function(req, res, next) {
    res.render('calculadora', { title: 'Vamos Crescer' });
});

router.get('/login.html', function(req, res, next) {
    res.render('login', { title: 'Vamos Crescer' });
});






module.exports = router;