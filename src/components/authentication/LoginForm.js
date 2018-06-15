import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import FormContainer from './generic/FormContainer';
import FormLogo from './generic/FormLogo';

const StyledAccountLink = styled.p`
  position: absolute;
  bottom: 40px;
  right: 40px;
`;

const StyledTitle = styled.h1`
  height: 120px;
`;

class LoginForm extends Component {
  renderLeft() {
    return [
      <StyledTitle
        key="title"
        className="h3 mb-4 font-weight-normal text-right"
      >
        Hi! nice to see you again
      </StyledTitle>,
      <StyledAccountLink key="link" className="font-weight-light">
        No account yet? <Link to="create-account">Create account</Link>
      </StyledAccountLink>
    ];
  }

  renderRight() {
    return [
      <FormLogo key="logo" />,
      <form key="form" className="text-left">
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            id="inputEmail"
            className="form-control font-weight-light mb-3 form-control-sm"
            required
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control font-weight-light mb-3 form-control-sm"
            required
          />
        </div>
        <button
          className="btn btn-lg btn-primary btn-block mb-3"
          type="submit "
        >
          Log in
        </button>
        <p className="font-weight-light">
          <Link to="forgot-password">Forgot password?</Link>
        </p>
      </form>
    ];
  }

  render() {
    return (
      <FormContainer left={this.renderLeft()} right={this.renderRight()} />
    );
  }
}

export default LoginForm;
