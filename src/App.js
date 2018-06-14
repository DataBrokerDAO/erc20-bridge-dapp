import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import HomePage from './components/homepage/HomePage';
import AuthenticationContainer from './components/authentication/AuthenticationContainer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/authenticate" component={AuthenticationContainer} />
      </div>
    );
  }
}
