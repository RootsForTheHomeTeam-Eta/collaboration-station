var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


router.post('/', function (req, res) {
    var mailOpts, smtpTrans;

    smtpTrans = nodemailer.createTransport('Gmail', {
        service: 'Gmail',
        auth: {
            user: "", //will be sue in hidden variable
            pass: ""
        }
    });
    //Mail options
    mailOpts = {
        from: "",//will be sue in hidden variable
        to: req.body.sendToemail,
        subject: 'A message from Roots for the Home Team',
        text: req.body.sendTomessage + '\n from ' + "Sue" + '\n at ' + "Roots for the Home Team"
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


