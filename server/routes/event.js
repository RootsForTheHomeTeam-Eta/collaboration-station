// event route
var express = require('express');
var router = express.Router();
var Venue = require('../../db/models/venue');

// return an array of json objects,each one representing a venue

// get venue event data
router.get('/getEvents', function(req, res, next) {
  console.log('Enter events route');
  // return all events
  Venue.find(
    //query
    {venueName: {$exists: true}},
    // callback
    function (err, docs){
      if (err) {
        next(err);
      }
      //returns an array of documents named docs
      res.json(docs);
    });
});

// post new event to a venue
router.post('/addEvent', function(req, res, next) {
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
        next(err);
      }
      res.json(doc);
    }
  );
});

module.exports = router;