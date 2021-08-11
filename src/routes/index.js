const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const brokersController = require('../controllers/brokersController');
const stepsFormsController = require('../controllers/stepsFormsController');
const messageValidator = require('../middlewares/messageValidator');
const calculatorController = require('../controllers/calculatorController');


router.get('/', indexController.index);
router.get('/apply-now', stepsFormsController.applyNow);
router.post('/apply-now', stepsFormsController.processApplyNow);
router.get('/prequalify', stepsFormsController.prequalify);
router.post('/prequalify', stepsFormsController.processPrequalify);
router.get('/faq', indexController.loadAllFaqs);
router.post('/message', indexController.message);
router.get('/calculator', calculatorController.getCalculator)
router.post('/calculator', calculatorController.processCalculator)
router.get('/brokers', brokersController.brokersAndRealtors);
router.post('/brokers', brokersController.loanSelect)
router.post('/lang', indexController.langChange)

module.exports = router;
