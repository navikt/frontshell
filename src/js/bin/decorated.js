#!/usr/bin/env node

require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const getDecorator = require('./decorator');

const server = express();

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
