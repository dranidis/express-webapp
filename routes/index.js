var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { name: req.user.email });
});

router.delete('/logout', function (req, res, next) {
  req.logOut()
  res.redirect('/login')
});


module.exports = router;
