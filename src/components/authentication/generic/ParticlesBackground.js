import React, { Component } from 'react';
import Particles from 'react-particles-js';

class ParticlesBackground extends Component {
  render() {
    return (
      <Particles
        className="particles gradient"
        params={{
          particles: {}
        }}
      />
    );
  }
}

export default ParticlesBackground;
