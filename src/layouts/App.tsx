import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import ForgotPassword from '../components/authentication/ForgotPassword';
import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';
import HomePage from '../components/homepage/HomePage';

export default class App extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
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
