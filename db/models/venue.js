var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VenueSchema = new Schema({
    venueName: String,
    location: String,
    date: [{type: Date, default: Date.now }],

});

module.exports = mongoose.model("Venue", VenueSchema);