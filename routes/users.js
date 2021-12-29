const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res) {
  const userInstance = require('../models/users');
  const users = await userInstance.getUsers();
  res.render('users/index', { users: users });
});

module.exports = router;
