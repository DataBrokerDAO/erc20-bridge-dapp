import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import ParticlesBackground from '../generic/ParticlesBackground';
import LoginForm from './LoginForm';

class LoginContainer extends Component {
  render() {
    return (
      <div>
        <ParticlesBackground />,<LoginForm />
      </div>
    );
  }
}

export default LoginContainer;
