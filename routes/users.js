var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  var userInstance = require('../models/users');
  var users = await userInstance.getUsers()
  res.render('users/index', { users: users });
});

module.exports = router;
