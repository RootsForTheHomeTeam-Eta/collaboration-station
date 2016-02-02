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
//router.post('/login', function(req, res, next) {
//    passport.authenticate('local-login',
//      { successRedirect: '/profile',
//        failureRedirect: '/login',
//        failureFlash: true
//      })(req, res, next);
//    res.sendStatus(200);
//});
/////////CURRENT/////////
//router.post('/login',
//  // upon authentication, send profile
//  function(req, res) {
//      passport.authenticate('local-login');
//      //console.log(req.isAuthenticated());
//      //res.json(req.isAuthenticated());
//  }
//);
///////////FROM TUTORIAL///////////
router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            return res.status(500).json({err: err});
        }
        if (!user) {
            return res.status(401).json({err: info});
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({err: 'Could not log in user'});
                //console.log('logIn error');
            }
            res.status(200).json({isAdmin: user.isAdmin,
                                  status: 'Login successful!',
                                  orgName: user.orgName});
            //console.log('status: login successful')
        });
    })(req, res, next);
});

router.get('/logout', function(req, res){
    req.logout();
    res.status(200).json({status: 'Bye!'});
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
///////////CURRENT////////
router.post('/register', function(req, res, next) {
    console.log('register route');
    passport.authenticate('local-register',
      { successFlash: true,
        failureFlash: true
      })(req, res, next);
    console.log(res.locals);
    console.log("Flash: ",res.locals.message);
    //res.sendStatus(200);
});

///////from tutorial////////
//router.post('/register', function(req, res) {
//    User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
//        if (err) {
//            return res.status(500).json({err: err});
//        }
//        passport.authenticate('local')(req, res, function () {
//            return res.status(200).json({status: 'Registration successful!'});
//        });
//    });
//});


//path.join(__dirname, '../../public/views/profile.html')

module.exports = router;