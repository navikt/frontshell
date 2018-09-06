import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormattedMessage as F } from 'react-intl';

class App extends Component {
  render() {
    const hello = window.frontShellExample.HELLO_FRONT_SHELL;
    const decoratedFrom = window.frontShellExample.APPRES_CMS_URL;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{ hello }, <F id="yay" /> am decorated from { decoratedFrom }</h2>
        </header>
      </div>
    );
  }
}

export default App;
