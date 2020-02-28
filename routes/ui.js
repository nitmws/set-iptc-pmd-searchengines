const express = require('express');
let router = express.Router();

/* GET default page */
router.get('/', function(req, res, next) {
  let pmdObj = {};
  pmdObj.creatorName = "Jane Doe";
  res.render('pmdform1', { pmdObj: pmdObj });
});

module.exports = router;
