'use strict';

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');

const getServer = () => {
  const server = express();

  const DEFAULT_SETTINGS_PROPERTY_NAME = 'frontShellSettings';

  const INDEX_FILE_DIR = process.env.INDEX_FILE_DIR;

  server.set('views', INDEX_FILE_DIR);
  server.set('view engine', 'mustache');
  server.engine('html', mustacheExpress());

  server.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
  });

  return server;
};

module.exports = getServer();
