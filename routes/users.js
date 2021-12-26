var express = require('express');
var router = express.Router();


var userInstance = require('../models/users');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  var userInstance = require('../models/users');
  var users = await userInstance.getUsers()
  res.render('users/index', { users: users });
});


router.post('/', async (req, res) => {
  console.log(req.body)
  // res.send('Create email' + req.body.email + ' pwd: ' + req.body.password);
  var err = await userInstance.createUser(req.body)
  if (err) {
    console.log("CREATE error: ", err)
    res.render('users/new', {
      user: req.body,
      error: err
    })
  } else {
    res.redirect('/users')
  }

});

router.get('/new', (req, res) => {
  res.render('users/new', { user: { email: '', password: '' } });
});

module.exports = router;
