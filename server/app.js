// instantiate express
var express = require('express');
var app = express();
//require dependencies
var path = require('path');
var bodyParser = require('body-parser');
var config = require('../config.js');
var passport = require('../auth/passport-local');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');


//var flash = require('connect-flash');
//
//app.use(flash());

// pretty json
app.set('json spaces', 2);

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// favicon
app.use(favicon(path.join(__dirname, '../public/favicon-1.ico')));


app.use(cookieParser());
// configure sessions
//include express session middleware
var session = require('express-session');
//include mongo session store for scalable, stable session store
var MongoDBStore = require('connect-mongodb-session')(session);
// instantiate session store
var store = new MongoDBStore(
  {
    uri: config.MONGOURI,
    collection: 'rootsSessions'
  }
);
// use and configure server sessions
app.use(session({
  secret: config.SECRET,
  key: 'user',
  resave: true,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    secure: false
  }
}));
// when in production, use secure cookies
//if (app.get('env') === 'production') {
//  app.set('trust proxy', 1); // trust first proxy
//  session.cookie.secure = true; // serve secure cookies
//}

// use morgan to log requires to the console
var morgan = require('morgan');
app.use(morgan('dev'));

// app settings
app.set('port', process.env.PORT || 3000);

// pull in database connection
require('../db/db');

// intialize passport
passport.init(app);

// instantiate expressJWT to check token
//var jwtCheck = expressJWT({
//  secret: config.SECRET
//});


// serve static public files
app.use(express.static(path.join(__dirname, '../public')));

// include route files
var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var auth = require('./routes/auth');
var event = require('./routes/event');
var user = require('./routes/user');
var saveSchedule = require('./routes/saveSchedule');
var notification = require('./routes/notification');
var schedule = require('./routes/getSchedule');

//nodemailer
var nodemailer = require('nodemailer');
var sendNotices = require('./routes/sendNotices');
var sendQuickMail = require('./routes/sendQuickMail');

app.use('/sendNotices', sendNotices);

// ***** ROUTES *****

app.use('/login', login);
app.use('/register', register);
app.use('/saveSchedule', saveSchedule);
app.use('/notification', notification);
app.use('/getSchedule', schedule);

// everything under /api/* will verify the jwt
//app.use('/api/*', jwtCheck);
app.use('/api/sendQuickMail', sendQuickMail);
app.use('/api/auth', auth);
// api event route
app.use('/api/event', event);
// api user route
app.use('/api/user', user);
// catch all route:
app.use('/', index);

// ***** ERROR HANDLERS *****

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// catch all error handler
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);

});

// ***** LISTEN *****

app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});


