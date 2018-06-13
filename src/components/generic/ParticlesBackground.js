import React, { Component } from 'react';
import Particles from 'react-particles-js';
import styled from 'styled-components';
import LoginForm from '../authentication/LoginForm';

const gradient1 = '#2e3192';
const gradient2 = '#00aeef';
const gradient3 = '#b8d659';

const StyledParticles = styled(Particles)`
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  background-image: linear-gradient(
    to right,
    ${gradient1},
    ${gradient2} 40%,
    ${gradient3}
  );
`;

class ParticlesBackground extends Component {
  render() {
    return (
      <StyledParticles
        params={{
          particles: {}
        }}
      />
    );
  }
}

export default ParticlesBackground;
