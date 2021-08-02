var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var brokersController = require('../controllers/brokersController');
var stepsFormsController = require('../controllers/stepsFormsController');
var messageValidator = require('../middlewares/messageValidator');



router.get('/', indexController.index);
router.get('/apply-now', stepsFormsController.applyNow);
router.post('/apply-now', stepsFormsController.processApplyNow);
router.get('/prequalify', stepsFormsController.prequalify);
router.post('/prequalify', stepsFormsController.processPrequalify);
router.get('/faq', indexController.loadAllFaqs);
router.post('/message', indexController.message);
router.get('/calculator', indexController.getCalculator)
router.post('/calculator', indexController.processCalculator)
router.get('/brokers', brokersController.brokersAndRealtors);
router.post('/brokers', brokersController.loanSelect)
router.post('/lang', indexController.langChange)

module.exports = router;
