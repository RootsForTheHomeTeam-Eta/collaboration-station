var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//for schedule print/view/save

var ScheduleSchema = new Schema({
    finalVenue: String,
    events: [{
        event: {
            finalEventDate: Date,
            finalGameTime: Date,
            finalArrivalTime: Date,
            finalOrgName: String
        }
    }]
});

module.exports = mongoose.model("Schedule", ScheduleSchema);