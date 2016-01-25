// admin route
var express = require('express');
var router = express.Router();
var passport = require('passport');

// use jwt-login passport strategy to authenticate login
router.post('/', passport.authenticate('jwt-login',
  // do not use sessions (we are using tokens)
  {session: false}
  ),
  // upon authentication, send profile
  function(req, res) {
    res.send(req.user.profile);
  }
);

module.exports = router;