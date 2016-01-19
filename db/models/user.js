var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    orgName: {type: String, required: true},
    firstName: {type:String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, require: true, index: { unique: true}},
    password: {type: String, required: true },
    created_at: Date,
    updated_at: Date

});

module.exports = mongoose.model("User", UserSchema);