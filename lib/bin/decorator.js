'use strict';

var jsdom = require('jsdom');
var request = require('request');

var JSDOM = jsdom.JSDOM;


var requestDecorator = function requestDecorator(callback) {
  return request(process.env.APPRES_CMS_URL + '/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true&skiplinks=true&megamenu-resources=true', callback);
};

var getDecorator = function getDecorator() {
  return new Promise(function (resolve, reject) {
    var callback = function callback(error, response, body) {
      if (!error && response.statusCode >= 200 && response.statusCode < 400) {
        var document = new JSDOM(body).window.document;

        var prop = 'innerHTML';

        var data = {
          NAV_SKIPLINKS: document.getElementById('skiplinks')[prop],
          NAV_SCRIPTS: document.getElementById('scripts')[prop],
          NAV_STYLES: document.getElementById('styles')[prop],
          NAV_HEADING: document.getElementById('header-withmenu')[prop],
          NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
          MEGAMENU_RESOURCES: document.getElementById('megamenu-resources')[prop]
        };
        resolve(data);
      } else {
        // todo better logging
        reject(new Error(error));
      }
    };

    requestDecorator(callback);
  });
};

module.exports = getDecorator;