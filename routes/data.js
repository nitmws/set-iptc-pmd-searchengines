const express = require('express');
let router = express.Router();

const genpmd = require('../services/generatepmd');

/* GET default response */
router.get('/', function(req, res, next) {
  res.redirect('/ui');
});

// POST request / edit
router.post('/gensedata', genpmd.pmd_edit_post);
module.exports = router;

// GET ExifTool data
router.get('/etjson/:filename', genpmd.pmd_get_etjson);
