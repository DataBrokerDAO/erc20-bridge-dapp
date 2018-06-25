import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './components/homepage/HomePage';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import ForgotPassword from './components/authentication/ForgotPassword';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/authenticate/login" component={Login} />,
        <Route path="/authenticate/create-account" component={Register} />,
        <Route
          path="/authenticate/forgot-password"
          component={ForgotPassword}
        />
      </Switch>
    );
  }
}
