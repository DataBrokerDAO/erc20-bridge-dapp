import React, { Component } from 'react';

import { connect } from 'react-redux';
import { logout, selectIsLoggedIn } from '../../../redux/account';
import { IReduxState } from '../../../redux/configureStore';

import NavbarLogo from './NavbarLogo';

import './Navbar.css';

class NavBar extends Component<{
  logo: string;
  logout: any;
  loggedIn: boolean;
}> {
  public render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <NavbarLogo src={this.props.logo} size={35} url="/" />

          <ul className="navbar-nav">
            <li className="nav-item">
              {this.props.loggedIn && (
                <button className="nav-link" onClick={this.props.logout}>
                  Logout
              </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(
  (s: IReduxState) => ({ loggedIn: selectIsLoggedIn(s) }),
  {
    logout
  }
)(NavBar);