var express = require('express');
var router = express.Router();
var programsController = require('../controllers/programsController');

router.get('/', programsController.loanPrograms)
router.get('/bridge-loan', programsController.bridgeLoan);
router.get('/fix-flip', programsController.fixFlip);
router.get('/cash-out', programsController.cashOut);
router.get('/rental', programsController.rental);


module.exports = router;
