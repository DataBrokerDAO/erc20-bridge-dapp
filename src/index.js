import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import './index.css';

import HomePage from './components/homepage/HomePage';
import OtherPage from './components/homepage/OtherPage';
import LoginContainer from './components/authentication/LoginContainer';

// Wait for document to load all chunks.
window.onload = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <BrowserRouter>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/other" component={OtherPage} />
          <Route path="/authenticate" component={LoginContainer} />
        </div>
      </BrowserRouter>,
      document.getElementById('root')
    );
  });
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
