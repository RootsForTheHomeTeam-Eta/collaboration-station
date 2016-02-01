var express = require('express');
var router = express.Router();
var Schedule = require('../../db/models/schedule');

router.post('/', function(req, res, next) {

    var events = [];

    //loop through each index of form data and create a schedule object
    for (i in req.body) {

        for (n in req.body[i].events) {
            var event = ({
                eventDate: req.body[i].events[n].eventDate,
                gameTime: req.body[i].events[n].gameTime,
                arrivalTime: req.body[i].events[n].arrivalTime,
                orgName: req.body[i].events[n].orgName
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

