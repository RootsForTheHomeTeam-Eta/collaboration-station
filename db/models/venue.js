var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VenueSchema = new Schema({
    venueName: String,
    location: String,
    date: [{type:Date: [{
                type:schema.Types.ObjectId, ref:'Users'[{first: Boolean}, {second:Boolean}, {cannot:Boolean}]},
                arrivalTime:Date,
                gameTime:Date}];

});

module.exports = mongoose.model("Venue", VenueSchema);