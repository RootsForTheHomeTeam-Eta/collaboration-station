var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var config = require('../config.js');
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
    passport.serializeUser(function(user, done) {
      done(null, user._id);
    });

    passport.deserializeUser(function(user, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });

    var options = {
      passReqToCallback: true,
    };

    // login strategy named local-login
    passport.use('local-login', new LocalStrategy(options,function(req, username, password, done) {
      console.log('Username: ' + username);
      console.log('Password: ' + password);
      console.log('inside strategy');
      // look in User model for
      User.findOne({username: username}, function(err, user) {
        // if an error, return an error
        if (err) {
          console.log('error');
          return done(err);
        }
        // if user does not exist, send flash message
        if (!user) {
          console.log('!user');
          return done(null, false, req.flash('error', 'Invalid Username or Password.'));
        }
        // if user exists, verify password with bcrypt compare before returning user
        if (user) {
          console.log('user');
          // generate salt to hash with
          bcrypt.genSalt(10, function(err, salt) {
            // hash req.body.password
            bcrypt.hash(password, salt, function(err, hash) {
              // compare hash with hash from db
              bcrypt.compare(hash, user.password, function(err) {
                // if error in password compare, send flash message
                if (err) {
                  console.log('bcrypt error');
                  return done(null, false, req.flash('error', 'Invalid Username or Password.'));
                }
                // finish authentication and return user
                console.log('success!');
                //return done(null, user);
              });
            });
          });
          console.log(user);
          return user;
        }
        console.log('inside db call');
        return done(null, user);
      });
      //console.log('outside db call');
      //return done(null, user);
    }));

// register strategy named local-register
    passport.use('local-register', new LocalStrategy(options, function(req, username, password, done) {
      console.log('Username: ' + username);
      console.log('Password: ' + password);
      console.log('inside register');
      // look in User model to check for existing user
      User.findOne({username: username}, function(err, user) {
        // if error, return
        if (err) { console.log('error');
          return done(err);
        }
        // if existing user, return flash message
        if (user) {
          console.log('user');
          done(null, false, req.flash('error', 'User Already Exists'));
        } else {
          console.log('create user');
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
              console.log('save error');
              console.log(err);
              return done(err);
            }
            // Successful registration, send new user
            console.log('successful reg');
            return done(null, newUser);
          });
        }
      });
    }));
  }
};







