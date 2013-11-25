var colors = require('colors');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * GET /play
 */

exports.index = function(req, res){
  console.log('play.index'.italic.underline.bold.magenta);
  res.render('play/index', {title: 'Express'});
};

/*
 * GET /game
 */

exports.game = function(req, res){
  console.log('play.game'.italic.underline.bold.magenta);
  res.render('play/game', {title: 'Express'});
};

