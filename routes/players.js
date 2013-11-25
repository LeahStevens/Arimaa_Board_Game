var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Player = mongoose.model('Player');

exports.index = function(req, res){
  console.log('players.index');
  res.render('players/index', {title: 'Express'});
};

exports.create = function(req, res){
  var player = new Player();
  player.email = req.body.email;

  bcrypt.hash(req.body.password, 10, function(err, hash){
    player.password = hash;
    player.save(function(err, user){
      if(err){
        res.send({status: 'error'});
      } else {
        res.send({status: 'ok'});
      }
    });
  });
};

exports.login = function(req, res){
  Player.findOne({email: req.body.email}, function(err, player){
    if(player){
      bcrypt.compare(req.body.password, player.password, function(err, result){
        if(result){
          req.session.regenerate(function(err){
            req.session.playerId = player.id;
            req.session.save(function(err){
              res.send({status: 'ok', email: player.email});
            });
          });
        } else {
          req.session.destroy(function(err){
            res.send({status: 'error'});
          });
        }
      });
    } else {
      res.send({status: 'error'});
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(err){
    console.log('This session is over.');
    res.send({status: 'ok'});
  });
};


exports.update = function(req, res){
  Player.findById(req.params.id, function(err, player){
    player.save(function(err, player){
      res.send({});
    });
  });
};