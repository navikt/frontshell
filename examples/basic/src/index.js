import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import NavApp from 'frontshell';

const nbMessages = {
  'yay': 'jeg'
};

const messages = {
  nb: nbMessages,
  en: {
    'yay': 'yay!!'
  }
}

// kan også importeres -> //import nbMessages from '../i18n/nb.json';

ReactDOM.render(<NavApp defaultSprak="nb" messages={messages}><App /></NavApp>, document.getElementById('root'));

registerServiceWorker();
