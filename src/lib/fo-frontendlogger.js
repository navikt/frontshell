'use strict';

const getFrontendLoggerInjectedScript = (appName, foLoggerUrl) => {
  if (!appName || !foLoggerUrl) {
    return '';
  }
  return `
<script type="application/javascript">
  // dette her er 'fallback' å brukes når frontendloggeren er nede
  window.frontendlogger = {
    info: function() {
      console.log('frontendlogger er ikke tilgjenelig');
      // det kanskje skjer pga problemmer med ${foLoggerUrl}
    }, warn: function() {
      console.log('frontendlogger er ikke tilgjenelig');
      // det kanskje skjer pga problemmer med ${foLoggerUrl}
    }, error: function() {
      console.log('frontendlogger er ikke tilgjenelig');
      // det kanskje skjer pga problemmer med ${foLoggerUrl}
    }, event: function() {
      console.log('frontendlogger er ikke tilgjenelig');
      // det kanskje skjer pga problemmer med ${foLoggerUrl}
    }
  };
  window.frontendlogger.appname = ${appName};
</script>
<script type="application/javascript" src="${foLoggerUrl}"></script>`;

};

module.exports = getFrontendLoggerInjectedScript;