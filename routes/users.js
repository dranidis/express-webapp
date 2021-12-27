var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');


var userRepository = require('../models/users');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  var userInstance = require('../models/users');
  var users = await userInstance.getUsers()
  res.render('users/index', { users: users });
});


router.post('/', async (req, res) => {
  console.log(req.body)
  var hashedPassword = await bcrypt.hash(req.body.password, 10);
  var err = await userRepository.createUser({
    email: req.body.email,
    password: hashedPassword
  })
  if (err) {
    console.log("CREATE error: ", err)
    res.render('users/new', {
      user: req.body,
      error: err
    })
  } else {
    res.redirect('/login')
  }
});

router.get('/new', (req, res) => {
  res.render('users/new', { user: { email: '', password: '' } });
});

module.exports = router;
