// user route
var express = require('express');
var router = express.Router();
var Venue = require('../../db/models/venue');
var User = require('../../db/models/venue');

router.post('/submit', function(req, res, next) {

    console.log("IN SUB");
    console.log("req.body show :", req.body[0]);

    for (i in req.body) {
        _id : req.body[i].eventId
        preferences.first :req.body[i].preferences.first

    }

    //var _id = req.body.0,
   //preferences: req.body.1.preferences.first

  //Venue.findOneAndUpdate(
  //    // query
  //    {_id: userSubmit._id},
  //    // doc to update
  //    {$push: {
  //      events: {
  //        event: {
  //            preferences: {
  //                first: event.preferences
  //            }
  //        }}
  //    }},
  //    // options to update with
  //    {
  //      new: true,
  //      upsert: true
  //    },
  //    // callback
  //    function(err, doc) {
  //      if (err) {
  //        console.log(err);
  //        next(err);
  //      }
  //      console.log(doc);
  //      res.json(doc);
  //    }
  //);
    res.sendStatus(200);

});

module.exports = router;