/**
 * Created by Manu on 2/2/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//for notification

var notificationSchema = new Schema({
    orgName: {type: String, required: true},
    dateSubmitted: {type : Date, default: Date.now},

});

module.exports = mongoose.model("notification", notificationSchema);