# Path variables (det som ligger i .env eller .env.development)

## [fo-frontendlogger](doc/fo-frontendlogger.md)
```properties
  FO_LOGGER_URL=/frontendlogger/logger.js
  APP_NAME=dinapp                           # app-navnet som sendes til grafana
```

## [Nav dekoratør](doc/decorator.md)
```
  FRONTSHELL_SETTINGS_PATH=config/env.json  # filen som man oppbevarer en liste av ting som ønskes å bli tilgjenelig i settings.js
  FRONTSHELL_SETTINGS_NAME=dittnavSettings  # property-navn som man vil bruke i appen
  APPRES_CMS_URL=http://appres.nav.no       # urlen til dekoratøren
```

## WEB_ROOT om default er 'build', men kan overskrives
```
  WEB_ROOT=build     # brukes av frontshell for å finne hvor index.html ligger og for å servere content
```