// event route
var express = require('express');
var router = express.Router();
var Venue = require('../../db/models/venue');

// post new event to a venue
router.post('/addEvent', function(req, res, next) {
  console.log("req.body " , req.body);
  var event = {
    venueName: req.body.venueName,
    eventDate: req.body.eventDate,
    arrivalTime: req.body.arrivalTime,
    gameTime: req.body.gameTime,
    submitBy: req.body.submitBy
  };

  Venue.findOneAndUpdate(
    // query
    {venueName: event.venueName},
    // doc to update
    {$push: {
      events: {
        event: {
          eventDate: event.eventDate,
          arrivalTime: event.arrivalTime,
          gameTime: event.gameTime,
          submitBy: event.submitBy
        }}
    }},
    // options to update with
    {
      new: true,
      upsert: true
    },
    // callback
    function(err, doc) {
      if (err) {
        console.log(err);
        next(err);
      }
      console.log(doc);
    }
  );
});


module.exports = router;