import React, { Component } from 'react';

import Navigation from '../navigation/Navigation';
import Content from '../generic/Content';

class HomePage extends Component {
  render() {
    return [
      <Navigation key="nav" />,
      <Content key="content">
        <p>Home</p>
      </Content>
    ];
  }
}

export default HomePage;
