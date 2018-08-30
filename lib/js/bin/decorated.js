#!/usr/bin/env node
'use strict';

require('dotenv').config();

var express = require('express');
var path = require('path');
var mustacheExpress = require('mustache-express');
var getDecorator = require('./decorator');
// const createEnvSettingsFile = require('./src/build/env');

var server = express();

var INDEX_FILE_DIR = process.env.INDEX_FILE_DIR;

server.set('views', INDEX_FILE_DIR);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

server.use(function (req, res, next) {
  res.removeHeader('X-Powered-By');
  next();
});

var renderApp = function renderApp(decoratorFragments) {
  return new Promise(function (resolve, reject) {
    server.render('index.html', decoratorFragments, function (err, html) {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

var startServer = function startServer(html) {
  // can be used for testing purposes
  // const delayAllResponses = millis => (req, res, next) => setTimeout(next, millis);
  // server.use(delayAllResponses(1000));

  // server.use('/mock-api', express.static(path.resolve(__dirname, 'src/mock-api')));
  // server.use('/lib/js', express.static(path.resolve(__dirname, 'build/static/js')));
  server.get('/index.html', function (req, res) {
    res.send(html);
  });
  server.use(express.static(process.env.WEB_ROOT, { index: false }));
  // server.get('/static/js/settings.js', (req, res) => res.send(createEnvSettingsFile()));

  server.get('/health/isAlive', function (req, res) {
    return res.sendStatus(200);
  });
  server.get('/health/isReady', function (req, res) {
    return res.sendStatus(200);
  });

  var port = process.env.PORT || 8080;
  server.listen(port, function () {
    console.log('App listening on port: ' + port); // eslint-disable-line
  });
};

var logError = function logError(errorMessage, details) {
  return console.log(errorMessage, details);
}; // eslint-disable-line

getDecorator().then(renderApp, function (error) {
  return logError('Failed to get decorator', error);
}).then(startServer, function (error) {
  return logError('Failed to render app', error);
});