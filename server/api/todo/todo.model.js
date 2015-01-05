'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
  name: String,
  title: String,
  duedate: String
});

module.exports = mongoose.model('Todo', TodoSchema);
