// auth route
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');


//// use jwt-login passport strategy to authenticate login
//router.post('/', passport.authenticate('jwt-login',
//  // do not use sessions (we are using tokens)
//  {session: false}
//  ),
//  // upon authentication, send profile
//  function(req, res) {
//    res.send(req.user.profile);
//  }
//);

// use local-login passport strategy to authenticate login
router.post('/login', function(req, res, next) {
    passport.authenticate('local-login',
      { successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);
});

  //function(req, res) {
  //  console.log('request cb');
  //  res.sendStatus(200);
  //}
//);

router.post('/register', function(req, res, next) {
    passport.authenticate('local-register',
      { successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);
    console.log(res.locals);
    console.log("Flash: " + res.locals.message);
});


//path.join(__dirname, '../../public/views/profile.html')

module.exports = router;