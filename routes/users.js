var express = require('express');
var router = express.Router();


var getUsers = require('../db/users');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var users  = await getUsers()
  res.render('users', {users: users});
});

module.exports = router;
