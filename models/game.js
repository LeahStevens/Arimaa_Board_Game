var mongoose = require('mongoose');

var Game = mongoose.Schema({
  // board: [],
  silver: String,
  gold: String,
  pieces: [],
  blackSquares: [],
  winner: String,
  loser: String,

  createdAt : {type: Date, default: Date.now}
});

mongoose.model('Game', Game);
