import React, { Component } from 'react';

import Navigation from '../navigation/Navigation';
import Content from '../generic/Content';

class HomePage extends Component {
  render() {
    return [
      <Navigation key="nav" />,

      <Content>
        <h1>Hi</h1>
      </Content>
    ];
  }
}

export default HomePage;
