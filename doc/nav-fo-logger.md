## [fo-frontendlogger](https://github.com/navikt/fo-frontendlogger)

For å koble loggeren, må følgende filene oppdateres:

### `index.html`
```html
<head>
    {{{NAV_FO_LOGGER}}}
</head>
```

### `.env`
```properties
  FO_LOGGER_URL=/frontendlogger/logger.js
  APP_NAME=dittnav
```