var express = require('express');
var router = express.Router();
var Schedule = require('../../db/models/schedule');

// save chosen schedule to db
// this is currently overwriting each schedule.
// we need it to save a new schedule every time
router.post('/', function(req, res, next) {
    console.log('inside save schedule route');
    console.log("req.body", req.body);
    var schedule = {
        finalVenue: req.body.finalVenue,
        finalEventDate: req.body.finalEventDate,
        finalArrivalTime: req.body.finalArrivalTime,
        finalGameTime: req.body.finalGameTime,
        finalOrgName: req.body.finalOrgName
    };
    console.log('hit the post');
    console.log(schedule.finalOrgName);
    console.log(schedule.finalVenue);

    Schedule.findOneAndUpdate(
        // query
        {finalVenue: schedule.finalVenue},
        // doc to update
        {$push: {
            events: {
                event: {
                    finalEventDate: schedule.finalEventDate,
                    finalArrivalTime: schedule.finalArrivalTime,
                    finalGameTime: schedule.finalGameTime,
                    finalOrgName: schedule.finalOrgName
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
            res.json(doc);
        }
    );
});

module.exports = router;
