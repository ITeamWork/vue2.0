var express = require('express');
var router = express.Router();

var users = require('./controller/users');

/* GET users listing. */
router.get('/', users.Index);

module.exports = router;
