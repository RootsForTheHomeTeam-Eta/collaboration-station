var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//for schedule print/view/save

var ScheduleSchema = new Schema({
    venueName: String,
    events: [{
        event: {
            eventDate: Date,
            gameTime: Date,
            arrivalTime: Date,
            orgName: String
        }
    }]
});

module.exports = mongoose.model("Schedule", ScheduleSchema);