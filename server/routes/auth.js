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

//router.post('/login', function(req, res, next) {
//  passport.authenticate('local-login', function(err, user, info) {
//    if (err) { return next(err); }
//    if (!user) { return res.redirect('/login'); }
//    req.logIn(user, function(err) {
//      if (err) { return next(err); }
//      return res.redirect('/profile');
//    });
//  })(req, res, next);
//});

//use local-login passport strategy to authenticate login
router.post('/login', function(req, res, next) {
    passport.authenticate('local-login',
      { successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);
    res.sendStatus(200);
});

//router.post('/login',
//    passport.authenticate('local-login', {failureRedirect: '/login', failureFlash: true }),
//    function(req, res, next) {
//    res.redirect('/profile');
//});
//router.post('/login', passport.authenticate('local-login',
//  { successRedirect: '/profile',
//    failureRedirect: '/login',
//    failureFlash: true
//  }), function(req, res, next) {
//  res.sendStatus(200);
//});

  //function(req, res) {
  //  console.log('request cb');
  //  res.sendStatus(200);
  //}
//);

router.post('/register', function(req, res, next) {
    console.log('register route');
    passport.authenticate('local-register',
      { successFlash: true,
        failureFlash: true
      })(req, res, next);
    console.log(res.locals);
    console.log("Flash: " + res.locals.message);
    res.sendStatus(200);
});


//path.join(__dirname, '../../public/views/profile.html')

module.exports = router;