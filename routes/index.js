var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
  var user = req.session.user;
  if(user){
      res.locals.user = user;
  }
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
