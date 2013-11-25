var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Player = mongoose.Schema({
  email     : {type: String, required: true, unique: true},
  password  : {type: String, required: true},
  // wins      : {type: Number},
  // losses    : {type: Number},

  createdAt : {type: Date, default: Date.now}
});

Player.plugin(uniqueValidator);
mongoose.model('Player', Player);
