/**
 * Created by Manu on 2/2/16.
 */
var express = require('express');
var router = express.Router();
var notification = require('../../db/models/notification');

// get venue event data
router.get('/getNotification', function(req, res, next) {
    console.log('Enter events route');
    // return all events
    notification.find(
        //query
        {orgName: {$exists: true}},
        // callback
        function (err, docs){
            if (err) {
                console.log('Error: ',err);
                next(err);
            }
            console.log('Notifications found!');
            //returns an array of documents named docs
            res.json(docs);
        });
});

router.post('/submitNotification', function(req, res, next) {
    console.log("in the noti route:", req.body);

    var alert = new notification ({
        orgName: req.body.orgName
    });

        alert.save(function (err){
            if (err) {
                console.log('hitting save:', err);

            }
        });



    res.sendStatus(200);

});

module.exports = router;
