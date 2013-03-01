var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  _ = require('underscore');

var UserSchema = new Schema({
  name: String,
  email: String,
  hashed_password: String,
  salt: String
});

UserSchema.virtual('password').set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.encryptPassword(password);
}).get(function() {
  return this._password;
});


UserSchema.path('name').validate(function(name) {
  return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function(email) {
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
  return hashed_password.length;
}, 'Password cannot be blank');

UserSchema.methods = {

  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  encryptPassword: function(password) {
    if (!password) return '';
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  }
};

mongoose.model('User', UserSchema);
