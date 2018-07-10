import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FormContainer from './generic/FormContainer';
import FormLogo from './generic/FormLogo';
import Particles from './generic/ParticlesBackground';

import './Authentication.css';

class LoginForm extends Component {
  public renderLeft() {
    return [
      <h1 key="title" className="h3 mb-4 font-weight-normal text-right h1">
        Hi! nice to see you again
      </h1>,
      <p key="link" className="font-weight-light a">
        No account yet? <Link to="create-account">Create account</Link>
      </p>
    ];
  }

  public renderRight() {
    return [
      <FormLogo key="logo" />,
      <form key="form" className="text-left">
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            id="inputEmail"
            className="form-control font-weight-light mb-3 form-control-sm"
            required={true}
            autoFocus={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control font-weight-light mb-3 form-control-sm"
            required={true}
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

  public render() {
    return [
      <Particles key="particles" />,
      <FormContainer
        key="formContainer"
        left={this.renderLeft()}
        right={this.renderRight()}
      />
    ];
  }
}

export default LoginForm;
