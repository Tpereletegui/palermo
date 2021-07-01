var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var messageValidator = require('../middlewares/messageValidator');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/calculator', function(req,res){
  res.render('calculator')
})


router.get('/faq', indexController.loadAllFaqs);
router.get('/apply-now', indexController.applyNow);

router.post('/message', messageValidator.message , indexController.message);

module.exports = router;
