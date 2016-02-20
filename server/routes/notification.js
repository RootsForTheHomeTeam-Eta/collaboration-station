/**
 * Created by Manu on 2/2/16.
 */
var express = require('express');
var router = express.Router();
var notification = require('../db/models/notification');

// delete notification from collection
router.delete('/deleteNotification/:id', function(req, res, next) {
    // return all events
    notification.remove(
        //query
        {_id: req.params.id},
        // callback
        function (err, docs){
            if (err) {
                next(err);
            }
            //returns an array of documents named docs
            res.sendStatus(200);
        });
});


// get array of notifcation objects data
router.get('/getNotification', function(req, res, next) {
    // return all events
    notification.find(
        //query
        {orgName: {$exists: true}},
        // callback
        function (err, docs){
            if (err) {
                next(err);
            }
            //returns an array of documents named docs
            res.json(docs);
        });
});

router.post('/submitNotification', function(req, res, next) {
    // initialize the alert
    var alert = new notification ({
        orgName: req.body.orgName
    });
        // save the alert
        alert.save(function (err){
            if (err) {
                next(err);
            }
        });
    res.sendStatus(200);

});

module.exports = router;
