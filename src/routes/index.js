var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var messageValidator = require('../middlewares/messageValidator');


/* GET home page. */
router.get('/', indexController.index);
router.get('/calculator', indexController.getCalculator)
router.post('/calculator', indexController.processCalculator)
router.get('/faq', indexController.loadAllFaqs);
router.get('/apply-now', indexController.applyNow);
router.post('/message', messageValidator.message , indexController.message);

module.exports = router;
