import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FormContainer from './generic/FormContainer';
import FormLogo from './generic/FormLogo';
import Particles from './generic/ParticlesBackground';

import './Authentication.css';

class ForgotPasswordForm extends Component {
  public renderLeft(): JSX.Element[] {
    return [
      <h1 key="title" className="h3 mb-4 font-weight-normal text-right">
        Forgot your password?
      </h1>,
      <p key="helpMessage" className="font-weight-light text-right p">
        No worries! We can get you into your account again. We'll send you an
        email to reset your password.
      </p>,
      <p key="link" className="font-weight-light a">
        Remember your password? <Link to="login">Log in</Link>
      </p>
    ];
  }

  public renderRight(): JSX.Element[] {
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
        <button
          className="btn btn-lg btn-primary btn-block mb-3"
          type="submit "
        >
          Send email
        </button>
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

export default ForgotPasswordForm;
