var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VenueSchema = new Schema({
    venueName: String,
    location: String,
    events: [{
      event: {
        eventDate: Date,
        organization: [{
          preferences: [{
            first: {type: Boolean, default: false},
            second: {type: Boolean, default: false},
            cannot: {type: Boolean, default: false}
          }],
          orgName: String
        }]
      },
      arrivalTime: Date,
      gameTime: Date
    }]
});

module.exports = mongoose.model("Venue", VenueSchema);