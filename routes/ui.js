const express = require('express');
let router = express.Router();

/* GET default page */
router.get('/', function(req, res, next) {
  res.render('start1', { });
});

router.get('/form', function(req, res, next) {
  let pmdObj = {};
  pmdObj.creatorName = "Jane Doe";
  res.render('pmdform1', { pmdObj: pmdObj });
});

router.get('/howto', function(req, res, next) {
  res.render('howto1', { });
});

router.get('/about', function(req, res, next) {
  res.render('about', { });
});

module.exports = router;
