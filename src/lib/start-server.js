'use strict';

const express = require('express');
const fs = require('fs');

const startServer = (server, html) => {
  // can be used for testing purposes
  // const delayAllResponses = millis => (req, res, next) => setTimeout(next, millis);
  // server.use(delayAllResponses(1000));

  const renderEnvSettingsFile = (settingsJsonFile, settingsName) => {
    if (settingsJsonFile && settingsName) {
      const data = JSON.parse(settingsJsonFile);
      return `window[${JSON.stringify(settingsName)}] = {${data.map((entry) => `${JSON.stringify(entry)}: ${JSON.stringify(process.env[entry])}`)}}`;
    } else {
      return '// settings file or|and settings outout property name is undefined';
    }
  }
  
  server.get('/index.html', (req, res) => {
    res.send(html);
  });

  server.get('/', (req, res) => {
    res.send(html);
  });

  server.get('/settings.js', (req, res) => {
    const settingsPath = process.env.FRONTSHELL_SETTINGS_PATH ? fs.readFileSync(process.env.FRONTSHELL_SETTINGS_PATH, 'utf8') : null;
    const settingsName = process.env.FRONTSHELL_SETTINGS_NAME ? process.env.FRONTSHELL_SETTINGS_NAME : null;
    res.send(renderEnvSettingsFile(settingsPath, settingsName));
  });

  server.use(express.static(process.env.WEB_ROOT || 'build', {index: false}));

  server.get('/health/isAlive', (req, res) => res.sendStatus(200));
  server.get('/health/isReady', (req, res) => res.sendStatus(200));

  const port = process.env.PORT || 8080;
  server.listen(port, () => {
    console.log(`App listening on port: ${port}`); // eslint-disable-line
  });
};

module.exports = startServer;
