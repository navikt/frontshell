'use strict';

var jsdom = require('jsdom');
var request = require('request');

var JSDOM = jsdom.JSDOM;
var _process$env = process.env,
    APPRES_CMS_URL = _process$env.APPRES_CMS_URL,
    DECORATOR_PATH = _process$env.DECORATOR_PATH,
    DECORATOR_FRAGMENT_HEADER_WITHMENU = _process$env.DECORATOR_FRAGMENT_HEADER_WITHMENU,
    DECORATOR_FRAGMENT_STYLES = _process$env.DECORATOR_FRAGMENT_STYLES,
    DECORATOR_FRAGMENT_SCRIPTS = _process$env.DECORATOR_FRAGMENT_SCRIPTS,
    DECORATOR_FRAGMENT_FOOTER_WITH_MENU = _process$env.DECORATOR_FRAGMENT_FOOTER_WITH_MENU,
    DECORATOR_FRAGMENT_SKIP_LINKS = _process$env.DECORATOR_FRAGMENT_SKIP_LINKS,
    DECORATOR_FRAGMENT_MEGAMENU_RESOURCES = _process$env.DECORATOR_FRAGMENT_MEGAMENU_RESOURCES;


var requestDecorator = function requestDecorator(callback) {
  return request('' + APPRES_CMS_URL + DECORATOR_PATH + '?header-withmenu=' + DECORATOR_FRAGMENT_HEADER_WITHMENU + '&styles=' + DECORATOR_FRAGMENT_STYLES + '&scripts=' + DECORATOR_FRAGMENT_SCRIPTS + '&footer-withmenu=' + DECORATOR_FRAGMENT_FOOTER_WITH_MENU + '&skiplinks=' + DECORATOR_FRAGMENT_SKIP_LINKS + '&megamenu-resources=' + DECORATOR_FRAGMENT_MEGAMENU_RESOURCES, callback);
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