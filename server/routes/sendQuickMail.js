var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../../config.js');

router.post('/', function (req, res) {
    var mailOpts, smtpTrans;

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
        to: 'rootsforthehometeameta@gmail.com',
        //to: req.body.gardenGroupAFC +","+ req.body.gardenGroupDWH +","+
        //    req.body.gardenGroupURF +","+ req.body.gardenGroupYFF +","+
        //    req.body.gardenGroupYFH +","+ req.body.gardenGroupYFL +","+
        //    req.body.gardenGroupYFP +","+ req.body.gardenGroupYFW,
        subject: 'A message from Roots for the Home Team',
        text: req.body.signUp + '\n from ' + "Sue" + '\n at ' + "Roots for the Home Team"
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
    smtpTrans.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
});

module.exports = router;