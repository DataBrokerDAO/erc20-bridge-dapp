import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ParticlesBackground from './generic/ParticlesBackground';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';

class LoginContainer extends Component {
  render() {
    return (
      <div>
        <ParticlesBackground key="particles" />,
        <Route path="/authenticate/login" component={LoginForm} />
        <Route path="/authenticate/create-account" component={RegisterForm} />
        <Route
          path="/authenticate/forgot-password"
          component={ForgotPasswordForm}
        />
      </div>
    );
  }
}

export default LoginContainer;
