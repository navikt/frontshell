'use strict';

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');

const getServer = () => {
  const server = express();

  server.set('views', process.env.WEB_ROOT || 'build');
  server.set('view engine', 'mustache');
  server.engine('html', mustacheExpress());

  server.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
  });

  return server;
};

module.exports = getServer();
