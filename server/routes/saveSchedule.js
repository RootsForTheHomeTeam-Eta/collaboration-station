var express = require('express');
var router = express.Router();
var Schedule = require('../../db/models/schedule');

router.post('/', function(req, res, next) {

    //loop through each index of form data and create a schedule object
    for (i in req.body) {
        var events = [];

        for (n in req.body[i].events) {
            var event = ({
                eventDate: req.body[n].events[i].eventDate,
                gameTime: req.body[n].events[i].gameTime,
                arrivalTime: req.body[n].events[i].arrivalTime,
                orgName: req.body[n].events[i].orgName
            });
            events.push(event);

        }
        var schedule = new Schedule ({
            venueName: req.body[i].venueName,
            events: events
        });

        schedule.save(function (err){
            if (err) {
                console.log(err);
            }
        });

    }

    res.sendStatus(200);

});

module.exports = router;

