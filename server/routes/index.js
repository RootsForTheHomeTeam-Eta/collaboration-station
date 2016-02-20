// index route
var express = require('express');
var router = express.Router();
var path = require('path');

// serves index file or whatever file is requested within the public directory
// i.e. css files
//router.get('/*', function(req, res) {
//  var file = req.params[0] || '/views/index.html';
//  res.sendFile(path.join(process.env.PWD, '../../public', file));
//});

router.get('/', function(req, res) {
    var file = 'views/index.html';
    res.sendFile(path.join(process.env.PWD, '../../public', file));
});


module.exports = router;