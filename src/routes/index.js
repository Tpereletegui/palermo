var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var messageValidator = require('../middlewares/messageValidator');



router.get('/', indexController.index);
router.get('/apply-now', indexController.applyNow);
router.post('/apply-now', indexController.processApplyNow);
router.get('/loan-programs', indexController.loanPrograms);
router.get('/faq', indexController.loadAllFaqs);
router.post('/message', messageValidator.message , indexController.message);
router.get('/bridge-loan', indexController.bridgeLoan);
router.get('/fix-flip', indexController.fixFlip);
router.get('/cash-out', indexController.cashOut);
router.get('/rental', indexController.rental);
router.get('/calculator', indexController.getCalculator)
router.post('/calculator', indexController.processCalculator)
router.get('/brokers', indexController.brokersAndRealtors);
router.post('/brokers', indexController.loanSelect)
router.post('/lang', indexController.langChange)

module.exports = router;
