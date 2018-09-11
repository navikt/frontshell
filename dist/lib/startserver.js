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

module.exports = startServer;