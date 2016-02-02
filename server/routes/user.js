// user route
var express = require('express');
var router = express.Router();
var Venue = require('../../db/models/venue');
var User = require('../../db/models/user');

router.get('/getUser', function(req, res, next) {

})

router.post('/submit', function(req, res, next) {

    console.log("IN SUB");
    console.log("req.body show :", req.body);
    // user org name
    var orgName = req.body.orgName;
    //console.log('orgName',orgName);
    // response event array
    var events = req.body.events;
    //console.log('events',events);

    // Upload to database
    events.forEach(function(elem) {

        console.log('inside events foreach');
        console.log('elem:',elem);
        // elem.preference
        Venue.findOneAndUpdate(
            // query
            {
                "_id": elem.venue_id,
                "events._id": elem.event_id
            },
            //doc to update
            {


                            $push: {
                                "events.$.event.organization":
                                    {
                                        orgName: req.body.orgName,
                                        preference: elem.preference
                                    }
                            }

            },
            //{
            //    $push: {
            //        "organization": {
            //            orgName: orgName,
            //            preference: elem.preference
            //        }
            //    }
            //},
            {
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

    //for (i in req.body) {
    //    _id : req.body[i].eventId
    //    preferences.first :req.body[i].preferences.first
    //
    //}

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