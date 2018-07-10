import React, { Component } from 'react';

import Navbar from '../generic/navbar/Navbar';

class Navigation extends Component {
  public render() {
    const items = [
      {
        name: 'Home',
        url: '/'
      },
      {
        name: 'Login',
        url: '/authenticate/login'
      }
      // TODO: add your navigation items here
    ];

    return (
      <Navbar
        dark={true}
        gradient={true}
        items={items}
        logo="images/logo_certimint_white.svg"
      />
    );
  }
}

export default Navigation;
