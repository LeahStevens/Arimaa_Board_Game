var mongoose = require('mongoose');
var Player = mongoose.model('Player');


exports.findPlayer = function(req, res, next){
  console.log('This is a request for session');
  if(req.session.playerId){
    Player.findById(req.session.playerId, function(err, player){
      if(player){
        console.log('setting player');
        res.locals.player = player;
        next();
      }
    });
  }else{
    next();
  }
};
