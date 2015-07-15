/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');

// Setup server
var app = express();
var server = require('http').createServer(app);
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var path = require('path');

app.set('view engine', 'html');
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/app')));

// Start server
server.listen(9000, function () {
  console.log('Express server listening on %d, in %s mode', 9000, app.get('env'));
});

// Expose app
exports = module.exports = app;
