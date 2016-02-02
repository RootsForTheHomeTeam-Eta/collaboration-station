var mongoose = require('mongoose');
var config = require('../config');

mongoose.set('debug',true);

var mongoURI = config.MONGOURI;

var MongoDB = mongoose.connect(mongoURI).connection;

// When successfully connected
MongoDB.on('connected', function () {
  console.log('Mongoose default connection open to ' + mongoURI);
});

// If the connection throws an error
MongoDB.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
MongoDB.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

module.exports = MongoDB;


