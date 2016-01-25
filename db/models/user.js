var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
    orgName: {type: String, required: true},
    firstName: {type:String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, require: true, index: { unique: true}},
    password: {type: String, required: true },
    created_at: Date,
    updated_at: Date
});

UserSchema.pre('save', function(next) {
  var user = this;
  console.log('saving user!');
  // only hash password if it has been modified or is new
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash password with salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);

      // override text with hash
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);