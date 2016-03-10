var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
//var config = require('../../config.js');

router.post('/', function (req, res) {
    var mailOpts, smtpTrans;
    console.log('emailData',req.body.recipients.join());
    var recipients = req.body.recipients.join();
    console.log('recipients: ',recipients)
    var message = req.body.message;
    // create transport object for nodemailer
    smtpTrans = nodemailer.createTransport('Gmail', {
        service: 'Gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });
    //Mail options
    mailOpts = {
        from: process.env.USER,
        to: recipients,
        subject: 'A message from Roots for the Home Team',
        text: message + '\n from ' + "Sue" + '\n Roots for the Home Team'
    };
    // send mail
    smtpTrans.sendMail(mailOpts, function (error, response) {
        //Email not sent
        if (error) {
            res.sendStatus(400);
            next(error)
        }
        //Email sent
        else {
            res.sendStatus(200);
        }
    });
    //not sure what this should be...confirmation alert?
    smtpTrans.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
});

module.exports = router;