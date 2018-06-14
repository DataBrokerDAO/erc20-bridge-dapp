import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import FormContainer from './generic/FormContainer';
import FormLogo from './generic/FormLogo';

const StyledAccountLink = styled.p`
  position: absolute;
  bottom: 40px;
  left: 40px;
`;

const StyledTitle = styled.h1`
  height: 120px;
`;

class LoginForm extends Component {
  renderRight() {
    return [
      <StyledTitle key="title" className="h3 mb-4 font-weight-normal text-left">
        Welcome!
      </StyledTitle>,
      <StyledAccountLink key="link" className="font-weight-light">
        Already have an account? <Link to="login">Log in</Link>
      </StyledAccountLink>
    ];
  }

  renderLeft() {
    return [
      <FormLogo />,
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
        <div className="form-group">
          <label htmlFor="inputConfirmPassword">Confirm password</label>
          <input
            type="password"
            id="inputConfirmPassword"
            className="form-control font-weight-light mb-3 form-control-sm"
            required
          />
        </div>
        <button
          className="btn btn-lg btn-primary btn-block mb-3"
          type="submit "
        >
          Create account
        </button>
      </form>
    ];
  }

  render() {
    return (
      <FormContainer
        left={this.renderLeft()}
        right={this.renderRight()}
        rightColored
      />
    );
  }
}

export default LoginForm;
