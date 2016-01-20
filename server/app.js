// instantiate express
var express = require('express');
var app = express();
//require dependencies
var path = require('path');
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var config = require('../config.js');

// use morgan to log requires to the console
var morgan = require('morgan');
app.use(morgan('dev'));



// app settings
app.set('port', process.env.PORT || 3000);

// instantiate expressJWT to check token
var jwtCheck = expressJWT({
  secret: config.SECRET
});

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static public files
app.use(express.static(path.join(__dirname, 'public')));

// include route files
var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');

// routing
app.use('/*', index);
// check jwt for protected routes
app.use('/protected/*', jwtCheck);
app.use('/protected/login', login);
app.use('/protected/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// catch all error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

});

app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});


