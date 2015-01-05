'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: String,
  name: String
});

module.exports = mongoose.model('User', UserSchema);
