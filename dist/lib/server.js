'use strict';

var express = require('express');
var path = require('path');
var mustacheExpress = require('mustache-express');

var getServer = function getServer() {
  var server = express();

  var DEFAULT_SETTINGS_PROPERTY_NAME = 'frontShellSettings';

  var INDEX_FILE_DIR = process.env.INDEX_FILE_DIR;

  server.set('views', INDEX_FILE_DIR);
  server.set('view engine', 'mustache');
  server.engine('html', mustacheExpress());

  server.use(function (req, res, next) {
    res.removeHeader('X-Powered-By');
    next();
  });

  return server;
};

module.exports = getServer();