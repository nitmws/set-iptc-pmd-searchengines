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


router.get('/howto/:prefos?', function(req, res, next) {
  let showos = {}
  showos.all = true;
  showos.windows = false;
  showos.macos = false;
  showos.linux = false;
  if (req.params.prefos){
    let prefos = req.params.prefos.toLowerCase();
    switch(prefos){
      case "windows":
        showos.all = false;
        showos.windows = true;
        break;
      case "macos":
        showos.all = false;
        showos.macos = true;
        break;
      case "linux":
        showos.all = false;
        showos.linux = true;
        break;
    }
  }
  res.render('howto2', {showos: showos, pagelink: "howto" });
});

router.get('/howto2/:prefos?', function(req, res, next) {
  let showos = {}
  showos.all = true;
  showos.windows = false;
  showos.macos = false;
  showos.linux = false;
  if (req.params.prefos){
    let prefos = req.params.prefos.toLowerCase();
    switch(prefos){
      case "windows":
        showos.all = false;
        showos.windows = true;
        break;
      case "macos":
        showos.all = false;
        showos.macos = true;
        break;
      case "linux":
        showos.all = false;
        showos.linux = true;
        break;
    }
  }
  res.render('howto2', {showos: showos, pagelink: "howto2"  });
});

router.get('/about', function(req, res, next) {
  res.render('about', { });
});

module.exports = router;
