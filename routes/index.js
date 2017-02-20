var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.session.user;
  if(!user)
    res.render('index', { title: 'Express' });
  else
    res.render('index', { title: 'Express','username':user.username });
});

module.exports = router;
