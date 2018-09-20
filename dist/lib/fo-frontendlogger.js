'use strict';

var getFrontendLoggerInjectedScript = function getFrontendLoggerInjectedScript(appName, foLoggerUrl) {
  if (!appName || !foLoggerUrl) {
    return '';
  }
  return '\n<script type="application/javascript">\n  // dette her er \'fallback\' \xE5 brukes n\xE5r frontendloggeren er nede\n  window.frontendlogger = {\n    info: function() {\n      console.log(\'frontendlogger er ikke tilgjenelig\');\n      // det kanskje skjer pga problemmer med ' + foLoggerUrl + '\n    }, warn: function() {\n      console.log(\'frontendlogger er ikke tilgjenelig\');\n      // det kanskje skjer pga problemmer med ' + foLoggerUrl + '\n    }, error: function() {\n      console.log(\'frontendlogger er ikke tilgjenelig\');\n      // det kanskje skjer pga problemmer med ' + foLoggerUrl + '\n    }, event: function() {\n      console.log(\'frontendlogger er ikke tilgjenelig\');\n      // det kanskje skjer pga problemmer med ' + foLoggerUrl + '\n    }\n  };\n  window.frontendlogger.appname = ' + appName + ';\n</script>\n<script type="application/javascript" src=' + foLoggerUrl + '></script>';
};

module.exports = getFrontendLoggerInjectedScript;