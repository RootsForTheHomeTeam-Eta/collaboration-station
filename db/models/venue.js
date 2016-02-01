var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VenueSchema = new Schema({
    venueName: String,
    location: String,
    events: [{
      event: {
        eventDate: Date,
        organization: [{
          orgName: String,
          preference: {type: String, default: 'cannot'}
          //preferences: [{
          //  //first: {type: Boolean, default: false},
          //  //second: {type: Boolean, default: false},
          //  //cannot: {type: Boolean, default: false}
          //    preference: {type: String, default: 'cannot'}
          //}]

        }],
        arrivalTime: Date,
        gameTime: Date,
        submitBy: Date
      }
    }]
});

module.exports = mongoose.model("Venue", VenueSchema);