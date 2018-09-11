#!/usr/bin/env node

'use strict';

require('../lib/loadenv');

var server = require('../lib/server');
var startServer = require('../lib/startServer');
var getDecorator = require('../lib/decorator');

var renderApp = function renderApp(server, decoratorFragments) {
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