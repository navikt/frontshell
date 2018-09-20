#!/usr/bin/env node

'use strict';

require('../lib/loadenv');

var server = require('../lib/server');
var startServer = require('../lib/startServer');
var getFrontendLoggerInjectedScript = require('../lib/fo-frontendlogger');

var renderApp = function renderApp() {
  return new Promise(function (resolve, reject) {
    server.render('index.html', { NAV_FO_LOGGER: getFrontendLoggerInjectedScript(APP_NAME, FO_LOGGER_URL) }, function (err, html) {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

var logError = function logError(errorMessage, details) {
  return console.log(errorMessage, details);
}; // eslint-disable-line

renderApp().then(function (html) {
  return startServer(server, html);
}, function (error) {
  return logError('Failed to render app', error);
});