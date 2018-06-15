import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';

const AsyncParticles = Loadable({
  loader: () =>
    import(/* webpackChunkName: "particles" */ './generic/ParticlesBackground'),
  loading: () => <p>Loading</p>,
  modules: ['particles']
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
