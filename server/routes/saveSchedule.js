var express = require('express');
var router = express.Router();
var Schedule = require('../../db/models/schedule');

// save chosen schedule to db

router.post('/', function(req, res, next) {
    console.log('inside save schedule route');

    var $schedules = [];

    //loop through each index of form data and create a schedule object
    for (i in req.body) {

        var $schedule = {
            venueName: req.body[i].venueName,
            events: req.body[i].events
        };
        console.log($schedule);

        $schedules.push($schedule);
    }

    console.log("save button clicked");

    res.sendStatus(200);

});

module.exports = router;

