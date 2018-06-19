import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import Loading from '../generic/Loading'

const AsyncParticles = Loadable({
  loader: () => import('./generic/ParticlesBackground.js'),
  loading: Loading,
  delay: 1000,
  timeout: 10000
});

class LoginContainer extends Component {
  render() {
    return [
      <AsyncParticles key="particles" />,
      <Route path="/authenticate/login" component={LoginForm} />,
      <Route path="/authenticate/create-account" component={RegisterForm} />,
      <Route
        path="/authenticate/forgot-password"
        component={ForgotPasswordForm}
      />
    ];
  }
}

export default LoginContainer;
