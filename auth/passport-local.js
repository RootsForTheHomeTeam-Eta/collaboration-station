var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
//var config = require('../config.js');
var User = require('../db/models/user');
var bcrypt = require('bcrypt');

module.exports = {
  init: function(app) {
    //initialize passport
    app.use(passport.initialize());
    // Persistent login sessions
    app.use(passport.session());

    // configure flash messages
    app.use(flash());
    app.use(function(req, res, next) {
      res.locals.message = req.flash();
      next();
    });

    // Passport session setup
    // serialize the user
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    // deserialize the user
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        if(err) done(err);
        done(null, user);
      });
    });
    // passport strategy options
    var options = {
      passReqToCallback: true,
      usernameField: 'username'
    };

    // login strategy named local-login
    passport.use('local-login', new LocalStrategy(options,function(req, username, password, done) {
      // look in User model for
      User.findOne({username: username}, function(err, user) {
        // if an error, return an error
        if (err) {
          return done(err);
        }
        // if user does not exist, send flash message
        if (!user) {
          return done(null, false, req.flash('error', 'Invalid Username or Password.'));
        }
        // if user exists, verify password with bcrypt compare before returning user
        if (user) {
          // generate salt to hash with
          bcrypt.genSalt(10, function(err, salt) {
            // hash req.body.password
            bcrypt.hash(password, salt, function(err, hash) {
              // compare hash with hash from db
              bcrypt.compare(hash, user.password, function(err) {
                // if error in password compare, send flash message
                if (err) {
                  return done(null, false, req.flash('error', 'Invalid Username or Password.'));
                }
                // finish authentication and return user
                return done(null, user);
              });
            });
          });
        }
      });
    }));

// register strategy named local-register
    passport.use('local-register', new LocalStrategy(options, function(req, username, password, done) {
      // look in User model to check for existing user
      User.findOne({username: username}, function(err, user) {
        // if error, return
        if (err) {
          return done(err);
        }
        // if existing user, return flash message
        if (user) {
          done(null, false, req.flash('error', 'User Already Exists'));
        } else {
          // if no existing user, create new user
          var newUser = new User({
            orgName: req.body.orgName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password
          });
          // save new user to database
          newUser.save(function(err) {
            if (err) {
              return done(err);
            }
            // Successful registration, send new user
            return done(null, newUser);
          });
        }
      });
    }));
  }
};







