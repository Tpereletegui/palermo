var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/calculator', function(req,res){
  res.render('calculator', {title: 'Palermo Lender'})
})

module.exports = router;
