var colors = require('colors');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * GET /
 */

exports.index = function(req, res){
  console.log('rules.index'.italic.underline.bold.magenta);
  res.render('rules/index', {title: 'Express'});
};
