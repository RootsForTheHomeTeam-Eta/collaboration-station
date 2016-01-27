var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    orgName: {type: String, required: true, index:{unique:true}},
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
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
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

//Mongoose method to compare password and make sure they are unique

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model("User", UserSchema);