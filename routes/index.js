const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { name: req.user.email });
});

router.delete('/logout', function (req, res) {
  req.logOut();
  res.redirect('/login');
});


module.exports = router;
