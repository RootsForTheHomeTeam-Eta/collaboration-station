var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    orgName: {type: String, required: true},
    firstName: {type:String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, require: true, index: { unique: true}},
    password: {type: String, required: true },
    created_at: Date,
    updated_at: Date

});
/**
 * This is based on Joseph's Web Token code and the article Password
 * Authentication with Mongoose(Part 1): bcrypt
 * http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
 */

UserSchema.pre('save', function(next){
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.ismodified('password'))
        return next();

    // generate salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err);

            // override the clear-text password with the hashed one
            user.password = hash;
            next();

        }); //END bcrypt.hash

    }); // END bcrypt.genSalt

}); // END UserSchema.pre

module.exports = mongoose.model("User", UserSchema);