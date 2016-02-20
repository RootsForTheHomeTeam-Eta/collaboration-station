var express = require('express');
var router = express.Router();
var Venue = require('../db/models/schedule');

// return an array of json objects,each one representing a venue

// get venue event data
router.get('/', function(req, res, next) {
    // return all events
    Venue.find(
        ////query
        //{venueName: {$exists: true}},
        //// callback
        function (err, docs){
            if (err) {
                next(err);
            }
            //returns an array of documents named docs
            res.json(docs);
        });
});

module.exports = router;
