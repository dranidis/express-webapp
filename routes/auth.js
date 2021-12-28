var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var userRepository = require('../models/users');

var passport = require('passport')

router.get('/login', function (req, res, next) {
    res.render('auth/login', { title: 'Express' });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/register', function (req, res, next) {
    res.render('auth/register', { user: { email: '', password: '' } });
});

router.post('/register', async function (req, res, next) {
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    var err = await userRepository.createUser({
        email: req.body.email,
        password: hashedPassword
    })
    if (err) {
        console.log("CREATE error: ", err)
        res.render('auth/register', {
            user: req.body,
            error: err
        })
    } else {
        res.redirect('auth//login')
    }
});

module.exports = router;
