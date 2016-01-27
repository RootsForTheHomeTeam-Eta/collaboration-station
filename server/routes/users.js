// user route
var express = require('express');
var router = express.Router();
var Venue = require('../../db/models/user');

// get user data
router.get('/getUsers', function(req, res, next) {
    console.log('Enter route');
    // return all events
    User.find(
        //query
        {username: {$exists: true}},
        // callback
        function (err, docs){
            if (err) {
                console.log('Error: ',err);
                next(err);
            }
            console.log('Docs found!');
            res.json(docs);
            //return docs;
        });
    //res.json(docs);
});

// post new event to a venue
router.post('/addUser', function(req, res, next) {
    console.log('inside add event route');
    console.log("req.body " , req.body);
    var user = {
        orgName: req.body.orgName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.email,
        password: req.body.password
    };

    Venue.findOneAndUpdate(
        // query
        {userName: user.userName},
        // doc to update
        {$push: {
            orgName: user.orgName,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password

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
    //res.json('User added successfully');
});

module.exports = router;