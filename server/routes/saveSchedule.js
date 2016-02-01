var express = require('express');
var router = express.Router();
var Schedule = require('../../db/models/schedule');

// save chosen schedule to db

router.post('/', function(req, res, next) {
    console.log('inside save schedule route');

    var events = [];

    //loop through each index of form data and create a schedule object
    for (i in req.body) {

        for (n in req.body[i].events) {
            var event = ({
                eventDate: req.body[i].events[n].eventName,
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
            if (err) throw err;
        });

        console.log(Schedule);

        //$schedules.push($schedule);
    }

    console.log("save button clicked");

    res.sendStatus(200);

});

module.exports = router;

