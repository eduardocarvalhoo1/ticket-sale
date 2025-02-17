var express = require('express');
var router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const Tickets = require('../models/Tickets');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next){
  res.render('login');
});

router.get('/tickets', function (req, res, next) {
  res.render('tickets');
});

module.exports = router;
