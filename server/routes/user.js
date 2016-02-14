// user route
var express = require('express');
var router = express.Router();
var Venue = require('../../db/models/venue');
var User = require('../../db/models/user');

router.get('/getUsers', function(req, res, next) {
    User.find(
        // empty query to return all users
        {},
        // return only orgName and username fields
        'orgName username',
        //callback
        function(err, users) {
            if (err) {
                console.log('/getUser Error: ',err);
            }
            res.json(users);
        });
});

router.post('/submit', function(req, res, next) {

    console.log("IN SUB");
    console.log("req.body show :", req.body);

    var orgName = req.body.orgName;
    var venue_id = req.body.venue_id;
    var event_id = req.body.event_id;
    var preference = req.body.preference;
    // Upload to database
    // elem.preference
        Venue.findOneAndUpdate(
            // query
            {
                "_id": venue_id,
                "events._id": event_id
            },
            //doc to update
            {


                            $push: {
                                "events.$.event.organization":
                                    {
                                        orgName: orgName,
                                        preference: preference
                                    }
                            }

            },{
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

    res.sendStatus(200);

});
//db.mycollection.update(
//    {'_id': ObjectId("5150a1199fac0e6910000002")},
//    { $pull: { "items" : { id: 23 } } },
//    false,
//    true
//);

router.put('/reset', function(req, res, next) {
    var venue_id = req.body.venue_id;
    var event_id = req.body.event_id;
    var pref_id = req.body.pref_id;
    console.log("reset :", req.body);
    // Upload to database
    // elem.preference
    Venue.findOneAndUpdate(
        // query
        {
            "_id": venue_id,
            "events._id": event_id
        },
        //doc to update
        {

            $pull: {
                "events.$.event.organization":
                {
                    _id: pref_id
                }
            }

        },{
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

    res.sendStatus(200);

});

module.exports = router;