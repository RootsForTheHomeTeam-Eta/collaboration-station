var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var signUp = "Hello everyone -  our game schedule for the season is " +
    "ready for your sign up.  Please pick the games that can work for you. " +
    "Note your first and second choices and if there are dates that are not doable. " +
    "Thank you. We'll confirm your game dates within the next couple of weeks.";

var firstRemind = "Hello Group - please take a look at our game schedule and sign " +
    "up for which dates work for your program. We need your picks by the end of the week. " +
    "Thank you.";

var secondRemind = "Hi - Please sign up for your games as soon as possible. We need to confirm " +
    "dates with everyone in the next couple of days.  Thank you.";

router.post('/', function (req, res) {
    var mailOpts, smtpTrans;

    smtpTrans = nodemailer.createTransport('Gmail', {
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    //Mail options
    mailOpts = {
        from: process.env.EMAIL_ADDRESS,
        //how do we get email addresses?
        //name is incorrect
        to: req.body.name,
        subject: 'A message from Roots for the Home Team',
        text: req.body.sign-up//values are the variable names above
        //we need to input those values here//
        + '\n from ' + "Sue" + '\n at ' + "Roots for the Home Team"
    };
    smtpTrans.sendMail(mailOpts, function (error, res) {
        //Email not sent
        if (error) {
            console.log(error + 'you goofed');
        }
        //Email sent
        else {
            console.log('whoosh');
        }
    });
    //not sure what this should be...confirmation alert?
    smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
});

module.exports = router;
