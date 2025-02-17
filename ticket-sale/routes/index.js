var express = require('express');
var router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const Tickets = require('../models/Tickets');
const ticketService = require('../services/ticketServices');
const ticketController = require('../controllers/ticketController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next){
  res.render('login');
});

router.get('/tickets/:userId', ticketController.getUserTickets);//new

module.exports = router;
