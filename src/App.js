import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import HomePage from './components/homepage/HomePage';
import OtherPage from './components/homepage/OtherPage';
import LoginContainer from './components/authentication/LoginContainer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/other" component={OtherPage} />
        <Route path="/authenticate" component={LoginContainer} />
      </div>
    );
  }
}
