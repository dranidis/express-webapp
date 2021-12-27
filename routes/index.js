var express = require('express');
var router = express.Router();

var passport = require('passport')

/* GET home page. */
router.get('/', checkAuthenticated, function (req, res, next) {
  res.render('index', { name: req.user.email });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.delete('/logout', function (req, res, next) {
  req.logOut()
  res.redirect('/login')
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}


module.exports = router;
