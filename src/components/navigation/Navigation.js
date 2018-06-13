import React, { Component } from 'react';

import Navbar from '../generic/navbar/Navbar';

class Navigation extends Component {
  render() {
    const items = [
      {
        name: 'Home',
        url: '/'
      },
      {
        name: 'Other',
        url: '/other'
      }
    ];

    return (
      <Navbar
        dark
        gradient
        items={items}
        logo="images/logo-settlemint-small.png"
      />
    );
  }
}

export default Navigation;
