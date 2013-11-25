var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models');

// // model middleware
// var middleware = require('./lib/middleware');

// route definitions
var home = require('./routes/home');
var play = require('./routes/play');
var rules = require('./routes/rules');
var players = require('./routes/players');


var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/arimaa');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', home.index);
app.get('/play', play.index);
app.get('/game', play.game);
app.get('/rules', rules.index);

app.get('/players', players.index);
app.post('/players', players.create);
app.put('/login', players.login);
app.delete('/logout', players.logout);
app.put('/players/:id', players.update);


// start server & socket.io
var common = require('./sockets/common');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: true, 'log level': 2});
server.listen(app.get('port'));
io.of('/app').on('connection', common.connection);
