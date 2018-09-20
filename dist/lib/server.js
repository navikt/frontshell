'use strict';

var express = require('express');
var path = require('path');
var mustacheExpress = require('mustache-express');

var getServer = function getServer() {
  var server = express();

  server.set('views', process.env.WEB_ROOT || 'build');
  server.set('view engine', 'mustache');
  server.engine('html', mustacheExpress());

  server.use(function (req, res, next) {
    res.removeHeader('X-Powered-By');
    next();
  });

  return server;
};

module.exports = getServer();