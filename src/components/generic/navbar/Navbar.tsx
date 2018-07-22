import React, { Component } from 'react';

import NavbarLogo from './NavbarLogo';

import './Navbar.css';

class Navbar extends Component<
  { logo: string },
  any
  > {
  public render() {
    const { logo } = this.props;

    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
      >
        <div className="container">
          <NavbarLogo src={logo} size={35} url="/" />
        </div>
      </nav>
    );
  }
}

export default Navbar;
