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

const StyledP = styled.p`
  height: 150px;
`;

class ForgotPasswordForm extends Component {
  renderLeft() {
    return [
      <h1 key="title" className="h3 mb-4 font-weight-normal text-right">
        Forgot your password?
      </h1>,
      <StyledP className="font-weight-light text-right">
        No worries! We can get you into your account again. We'll send you an
        email to reset your password.
      </StyledP>,
      <StyledAccountLink key="link" className="font-weight-light">
        Remember your password?{' '}
        <Link exact to="login">
          Log in
        </Link>
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
        <button
          className="btn btn-lg btn-primary btn-block mb-3"
          type="submit "
        >
          Send email
        </button>
      </form>
    ];
  }

  render() {
    return (
      <FormContainer left={this.renderLeft()} right={this.renderRight()} />
    );
  }
}

export default ForgotPasswordForm;
