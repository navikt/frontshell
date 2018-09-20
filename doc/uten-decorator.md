### Bruk create-react-app for å lage en ny app
```bash
  create-react-app frontshell-example
  cd frontshell-example
  npm i -S git+https://git@github.com/navikt/frontshell.git
```

### Lag en ny `.env` fil
```
  APPRES_CMS_URL=http://appres.nav.no

  FRONTSHELL_SETTINGS_PATH=settings.json
  FRONTSHELL_SETTINGS_NAME=frontShellExample
  WEB_ROOT=build

  HELLO_FRONT_SHELL=Hi there
```

### `package.json` må endres sånn
```json
  {
    ...
    "scripts": {
      "server-dev": "NODE_ENV=development undecorated", // bruk .env.development filen for å kjøre det lokalt
      "server": "undecorated",
      ...
    },
    ...
  }
```

### `settings.json`
```json
  ["HELLO_FRONT_SHELL", "APPRES_CMS_URL"]
```

### `index.html`
```html
  <html>
    <head>
      <script type="text/javascript" src="/settings.js"></script>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
```

### `App.js`
```javascript
  import React, { Component } from 'react'
  import logo from './logo.svg'
  import './App.css'

  class App extends Component {
    render() {
      const hello = window.frontShellExample.HELLO_FRONT_SHELL;
      const decoratedFrom = window.frontShellExample.APPRES_CMS_URL;
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>{ hello }, i am decorated from { decoratedFrom }</h2>
          </header>
        </div>
      )
    }
  }
  export default App;
```

### Fyr opp appen
```bash
  npm run build && npm run server
```