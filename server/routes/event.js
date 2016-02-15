// event route
var express = require('express');
var router = express.Router();
var Venue = require('../../db/models/venue');

// DELETE an event at venue
router.put('/deleteEvent', function(req, res, next) {
  var venue_id = req.body.venue;
  var event_id = req.body.event;
  console.log("delete event :", req.body);
  Venue.findOneAndUpdate(
      // query
      {
        "_id": venue_id,
      },
      //doc to update
      {

        $pull: {
          "events":
          {
            _id: event_id
          }
        }

      },{
        upsert: true,
        multi: false,
        new: true
      }, function(err, model) {
        if (err) {
          console.log(err);
        } else {
          return model;
        }
      }
  );
});


// delete notification from collection
router.delete('/deleteVenue/:id', function(req, res, next) {
  console.log('Enter delete venue route', req.params.id);

  Venue.remove(
      //query
      {_id: req.params.id},
      // callback
      function (err, docs){
        if (err) {
          console.log('Error: ',err);
          next(err);
        }
        console.log('Venuefound!');
        console.log(docs);
        //returns an array of documents named docs
        res.sendStatus(200);
      });
});



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