'use strict';

var fs = require('fs');
var dotenv = require('dotenv');
dotenv.config();

if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  var envConfig = dotenv.parse(fs.readFileSync('.env.development'));
  for (var k in envConfig) {
    process.env[k] = envConfig[k];
  }
}