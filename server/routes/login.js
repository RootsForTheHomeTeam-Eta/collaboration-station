// login route
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
  res.json(req.isAuthenticated());
});

// use local-login passport strategy to authenticate login
router.post('/',
  // upon authentication, send profile
  function(req, res) {
    passport.authenticate('local-login')
    console.log(req.isAuthenticated());
    res.json(req.isAuthenticated());
  }
);

module.exports = router;