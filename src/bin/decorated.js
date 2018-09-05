#!/usr/bin/env node

require('./loadenv');

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const fs = require('fs');

const getDecorator = require('./decorator');

const server = express();

const renderEnvSettingsFile = (settingsJsonFile, settingsName) => {
  if (settingsJsonFile && settingsName) {
    const data = JSON.parse(settingsJsonFile);
    return `window.${settingsName} = {${data.map((entry) => `${entry}: '${process.env[entry]}'`)}}`;
  } else {
    return '// settings file or|and settings outout property name is undefined';
  }
}

const DEFAULT_SETTINGS_PROPERTY_NAME = 'frontShellSettings';

const INDEX_FILE_DIR = process.env.INDEX_FILE_DIR;

server.set('views', INDEX_FILE_DIR);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

server.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});

const renderApp = decoratorFragments =>
  new Promise((resolve, reject) => {
    server.render('index.html', decoratorFragments, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });

const startServer = (html) => {
  // can be used for testing purposes
  // const delayAllResponses = millis => (req, res, next) => setTimeout(next, millis);
  // server.use(delayAllResponses(1000));

  server.get('/index.html', (req, res) => {
    res.send(html);
  });

  server.get('/', (req, res) => {
    res.send(html);
  });

  server.get('/settings.js', (req, res) => {
    const settingsPath = process.env.FRONTSHELL_SETTINGS_PATH ? fs.readFileSync(process.env.FRONTSHELL_SETTINGS_PATH, 'utf8') : null;
    const settingsName = process.env.FRONTSHELL_SETTINGS_NAME ? process.env.FRONTSHELL_SETTINGS_NAME : DEFAULT_SETTINGS_PROPERTY_NAME;
    res.send(renderEnvSettingsFile(settingsPath, settingsName));
  });

  server.use(express.static(process.env.WEB_ROOT, {index: false}));

  server.get('/health/isAlive', (req, res) => res.sendStatus(200));
  server.get('/health/isReady', (req, res) => res.sendStatus(200));

  const port = process.env.PORT || 8080;
  server.listen(port, () => {
    console.log(`App listening on port: ${port}`); // eslint-disable-line
  });
};

const logError = (errorMessage, details) => console.log(errorMessage, details); // eslint-disable-line

getDecorator()
  .then(renderApp, error => logError('Failed to get decorator', error))
  .then(startServer, error => logError('Failed to render app', error));
