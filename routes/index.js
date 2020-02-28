var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/ui');
});

router.get('/howto', function(req, res, next) {
  res.render('howto1', { });
});

router.get('/about', function(req, res, next) {
  res.render('about', { });
});

module.exports = router;
