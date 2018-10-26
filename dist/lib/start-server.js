'use strict';

var express = require('express');
var fs = require('fs');

var startServer = function startServer(server, html) {
  // can be used for testing purposes
  // const delayAllResponses = millis => (req, res, next) => setTimeout(next, millis);
  // server.use(delayAllResponses(1000));

  var renderEnvSettingsFile = function renderEnvSettingsFile(settingsJsonFile, settingsName) {
    if (settingsJsonFile && settingsName) {
      var data = JSON.parse(settingsJsonFile);
      return 'window[' + JSON.stringify(settingsName) + '] = {' + data.map(function (entry) {
        return JSON.stringify(entry) + ': ' + JSON.stringify(process.env[entry]);
      }) + '}';
    } else {
      return '// settings file or|and settings outout property name is undefined';
    }
  };

  var CONTEXT_PATH = process.env.CONTEXT_PATH || '';

  if (process.env.FRONT_SHELL_DEBUG) {
    server.use(function (req, res, next) {
      console.log(req.url);
      next();
    });
  }

  server.get(CONTEXT_PATH + '/index.html', function (req, res) {
    res.send(html);
  });

  server.get(CONTEXT_PATH + '/', function (req, res) {
    res.send(html);
  });

  server.get(CONTEXT_PATH + '/settings.js', function (req, res) {
    var settingsPath = process.env.FRONTSHELL_SETTINGS_PATH ? fs.readFileSync(process.env.FRONTSHELL_SETTINGS_PATH, 'utf8') : null;
    var settingsName = process.env.FRONTSHELL_SETTINGS_NAME ? process.env.FRONTSHELL_SETTINGS_NAME : null;
    res.type('.js');
    res.send(renderEnvSettingsFile(settingsPath, settingsName));
  });

  server.use(CONTEXT_PATH, express.static(process.env.WEB_ROOT || 'build', { index: false }));

  server.get(CONTEXT_PATH + '/health/isAlive', function (req, res) {
    return res.sendStatus(200);
  });
  server.get(CONTEXT_PATH + '/health/isReady', function (req, res) {
    return res.sendStatus(200);
  });

  app.get('*', function (req, res) {
    res.send(html);
  });

  var port = process.env.PORT || 8080;
  server.listen(port, function () {
    console.log('App listening on port: ' + port); // eslint-disable-line
  });
};

module.exports = startServer;