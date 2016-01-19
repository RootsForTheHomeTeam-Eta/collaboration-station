// require dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// instantiate express
var app =  express();

// app settings
app.set('port', process.env.PORT || 3000);

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static public files
app.use(express.static(path.join(__dirname, 'public')));

// include route files
var index = require('./routes/index');

// routing
app.use('/', index);

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

app.listen(app.get('port', function() {
  console.log('Listening on port: ', app.get('port'));
}));

module.exports = app;

