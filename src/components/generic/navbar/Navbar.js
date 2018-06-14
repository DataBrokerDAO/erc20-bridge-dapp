import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import NavbarLogo from './NavbarLogo';

class Navbar extends Component {
  render() {
    const { dark = false, gradient = false, items, logo } = this.props;

    return (
      <nav
        className={`navbar navbar-expand-lg ${
          dark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
        } ${gradient ? 'gradient' : ''}`}
      >
        <div className="container">
          <NavbarLogo src={logo} size="35" url="/" />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {items.map((item, key) => {
                return (
                  <li key={key} className="nav-item">
                    <NavLink exact className="nav-link" to={item.url}>
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
