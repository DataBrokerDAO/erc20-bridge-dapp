import React, { Component } from 'react';
import Particles from 'react-particles-js';
import styled from 'styled-components';
import LoginForm from '../authentication/LoginForm';

const gradient1 = '#2e3192';
const gradient2 = '#00aeef';
const gradient3 = '#b8d659';

const StyledParticles = styled(Particles)`
  height: 100vh;
  width: 100vw;
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
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
