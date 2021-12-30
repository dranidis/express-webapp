const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const userRepository = require('../models/users');

const passport = require('passport');

router.get('/login', function (req, res) {
  res.render('auth/login', { title: 'Express' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/register', function (req, res) {
  res.render('auth/register', { user: { email: '', password: '' } });
});

router.post('/register', async function (req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const err = await userRepository.createUser({
    email: req.body.email,
    password: hashedPassword
  });
  if (err) {
    console.log('CREATE error: ', err);
    res.render('auth/register', {
      user: req.body,
      error: err
    });
  } else {
    res.redirect('auth/login');
  }
});

module.exports = router;
