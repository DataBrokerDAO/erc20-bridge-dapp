import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FormContainer from './generic/FormContainer';
import FormLogo from './generic/FormLogo';
import Particles from './generic/ParticlesBackground';

import './Authentication.css';

class LoginForm extends Component {
  renderRight() {
    return [
      <h1 key="title" className="h3 mb-4 font-weight-normal text-left h1">
        Welcome!
      </h1>,
      <p key="link" className="font-weight-light a">
        Already have an account? <Link to="login">Log in</Link>
      </p>
    ];
  }

  renderLeft() {
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
