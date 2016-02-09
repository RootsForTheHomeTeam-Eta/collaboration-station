var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../../config');


router.post('/', function (req, res) {
    var mailOpts, smtpTrans;
    var recipient = req.body.sendToemail;
    var message = req.body.sendTomessage;
    console.log(req.body);
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
        from: "",//will be sue in hidden variable
        to: recipient,
        subject: 'A message from Roots for the Home Team',
        text: message + '\n from ' + "Sue" + '\n at ' + "Roots for the Home Team"
    };
    // send mail
    smtpTrans.sendMail(mailOpts, function (error) {
        //Email not sent
        if (error) {
            res.sendStatus(400);
            next(error);
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


