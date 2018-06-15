import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './components/homepage/HomePage';
import Authentication from './components/authentication/AuthenticationContainer';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/authenticate" component={Authentication} />
      </Switch>
    );
  }
}
