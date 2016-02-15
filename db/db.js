var mongoose = require('mongoose');
//var config = require('../config');

// uncomment for mongoose debugging
mongoose.set('debug',true);

// retrieves mongo server location from config file
var mongoURI = process.env.MONGOURI;

// connects to mongo
var MongoDB = mongoose.connect(mongoURI).connection;

// When successfully connected, display message
MongoDB.on('connected', function () {
  console.log('Mongoose default connection open to ' + mongoURI);
});

// If the connection throws an error, display message
MongoDB.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected, display message
MongoDB.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

module.exports = MongoDB;


