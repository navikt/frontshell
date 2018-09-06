#!/usr/bin/env node
'use strict';

require('./loadenv');

var express = require('express');
var path = require('path');
var mustacheExpress = require('mustache-express');
var fs = require('fs');

var getDecorator = require('./decorator');

var server = express();

var renderEnvSettingsFile = function renderEnvSettingsFile(settingsJsonFile, settingsName) {
  if (settingsJsonFile && settingsName) {
    var data = JSON.parse(settingsJsonFile);
    return 'window.' + settingsName + ' = {' + data.map(function (entry) {
      return entry + ': \'' + process.env[entry] + '\'';
    }) + '}';
  } else {
    return '// settings file or|and settings outout property name is undefined';
  }
};

var DEFAULT_SETTINGS_PROPERTY_NAME = 'frontShellSettings';

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

  server.get('/index.html', function (req, res) {
    res.send(html);
  });

  server.get('/', function (req, res) {
    res.send(html);
  });

  server.get('/settings.js', function (req, res) {
    var settingsPath = process.env.FRONTSHELL_SETTINGS_PATH ? fs.readFileSync(process.env.FRONTSHELL_SETTINGS_PATH, 'utf8') : null;
    var settingsName = process.env.FRONTSHELL_SETTINGS_NAME ? process.env.FRONTSHELL_SETTINGS_NAME : DEFAULT_SETTINGS_PROPERTY_NAME;
    res.send(renderEnvSettingsFile(settingsPath, settingsName));
  });

  server.use(express.static(process.env.WEB_ROOT, { index: false }));

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