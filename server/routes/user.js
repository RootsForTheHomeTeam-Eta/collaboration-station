// user route
var express = require('express');
var router = express.Router();
var Venue = require('../../db/models/venue');
var User = require('../../db/models/venue');

router.post('/submit', function(req, res, next) {
  // submit the data
  // iterate through data
  // for each venue
  // // find the venue, modify the organization prefs
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;