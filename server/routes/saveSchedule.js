var express = require('express');
var router = express.Router();
var Schedule = require('../../db/models/schedule');

// save chosen schedule to db

router.post('/', function(req, res, next) {
    console.log('inside save schedule route');
    console.log("req.body", req.body);

    var schedule = {
        venueName: req.body.venueName,
        events: req.body.events,
        orgName: req.body.events.orgName
    };

    console.log('hit the post');

    Schedule.findOneAndUpdate(
        // query
        {venue: schedule.venueName},
        // doc to update
        {$push: {
            events: {
                event: {
                    eventDate: schedule.eventDate,
                    arrivalTime: schedule.arrivalTime,
                    gameTime: schedule.gameTime,
                    orgName: schedule.orgName
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
