// user route
var express = require('express');
var router = express.Router();
var Venue = require('../../db/models/venue');
var User = require('../../db/models/venue');

router.post('/submit', function(req, res, next) {
  // do something
  res.sendStatus(200);
});

module.exports = router;