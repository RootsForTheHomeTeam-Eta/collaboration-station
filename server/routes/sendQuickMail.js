var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../../config.js');

router.post('/', function (req, res) {
    var mailOpts, smtpTrans;
    console.log('emailData',req.body.recipients.join());
    var recipients = req.body.recipients.join();
    console.log('recipients: ',recipients)
    var message = req.body.message;

    smtpTrans = nodemailer.createTransport('Gmail', {
        service: 'Gmail',
        auth: {
            user: config.GMAIL.USER, //will be sue in hidden variable
            pass: config.GMAIL.PASS
        }
    });
    //Mail options
    mailOpts = {
        from: " ",//will be sue in hidden variable
        to: recipients,
        //to: req.body.gardenGroupAFC +","+ req.body.gardenGroupDWH +","+
        //    req.body.gardenGroupURF +","+ req.body.gardenGroupYFF +","+
        //    req.body.gardenGroupYFH +","+ req.body.gardenGroupYFL +","+
        //    req.body.gardenGroupYFP +","+ req.body.gardenGroupYFW,
        subject: 'A message from Roots for the Home Team',
        text: message + '\n from ' + "Sue" + '\n at ' + "Roots for the Home Team"
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
        //Email not sent
        if (error) {
            res.sendStatus(400);
            console.log(error + 'you goofed');
        }
        //Email sent
        else {
            res.sendStatus(200);
            console.log('whoosh');
        }
    });
    //not sure what this should be...confirmation alert?
    smtpTrans.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
});

module.exports = router;