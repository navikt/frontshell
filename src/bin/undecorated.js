#!/usr/bin/env node
'use strict';

require('../lib/loadenv');

const server = require('../lib/server');
const startServer = require('../lib/start-server');
const getFrontendLoggerInjectedScript = require('../lib/fo-frontendlogger');

const renderApp = () =>
  new Promise((resolve, reject) => {
    server.render('index.html', {NAV_FO_LOGGER: getFrontendLoggerInjectedScript(JSON.stringify(process.env.APP_NAME), JSON.stringify(process.env.FO_LOGGER_URL))}, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });

const logError = (errorMessage, details) => console.log(errorMessage, details); // eslint-disable-line

renderApp()
  .then((html) => startServer(server, html), error => logError('Failed to render app', error));
  