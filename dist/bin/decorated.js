#!/usr/bin/env node

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('../lib/loadenv');

var server = require('../lib/server');
var startServer = require('../lib/startServer');
var getDecorator = require('../lib/decorator');
var getFrontendLoggerInjectedScript = require('../lib/fo-frontendlogger');

var renderApp = function renderApp(server, decoratorFragments) {
  return new Promise(function (resolve, reject) {
    server.render('index.html', _extends({}, decoratorFragments, { NAV_FO_LOGGER: getFrontendLoggerInjectedScript(JSON.stringify(process.env.APP_NAME), JSON.stringify(process.env.FO_LOGGER_URL)) }), function (err, html) {
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

getDecorator().then(function (fragments) {
  return renderApp(server, fragments);
}, function (error) {
  return logError('Failed to get decorator', error);
}).then(function (html) {
  return startServer(server, html);
}, function (error) {
  return logError('Failed to render app', error);
});