// auth route
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// login route
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
            }
            res.status(200).json({isAdmin: user.isAdmin,
                                  status: 'Login successful!',
                                  orgName: user.orgName,
                                  firstName: user.firstName});
        });
    })(req, res, next);
});

// logout route
router.get('/logout', function(req, res){
    req.logout();
    res.status(200).json({status: 'Bye!'});
});

// register route
router.post('/register', function(req, res, next) {
    passport.authenticate('local-register',
      { successFlash: true,
        failureFlash: true
      })(req, res, next);
    res.sendStatus(200);
});

module.exports = router;