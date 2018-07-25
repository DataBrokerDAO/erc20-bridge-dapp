import React, { Component } from 'react';
// import * as Redux from 'redux';

import { connect } from 'react-redux';
import { login } from '../../redux/account';
// import { IReduxState } from '../../redux/configureStore';

import Container from '../generic/Container';

import './Authentication.css';

class LoginForm extends Component<{ login: any }> {

  public state = {
    mnemonic: ''
  }

  public render() {
    return (
      <Container className="LoginPage--container" >
        <ul className="nav nav-pills nav-fill mb-4">
          <li className="nav-item">
            <a className="nav-link active" href="#">Mnemonic</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Private Key</a>
          </li>
        </ul>
        <form key="form" className="text-left" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <input
              type="text"
              id="mnemonic"
              className="form-control mt-3 mb-3 form-control-sm"
              onChange={this.handleChange}
              placeholder="eg. catalog dismiss other deny sphere arm cloud route manual oval cancel dress"
              required={true}
            />
          </div>
          <button
            className="btn btn-lg btn-primary float-right"
            type="submit "
          >
            Login
          </button>
        </form>
      </ Container>
    );
  }

  private handleChange = (evt: any) => {
    this.setState({ mnemonic: evt.target.value })
  }

  private handleSubmit = (evt: any) => {
    evt.preventDefault();
    this.props.login(this.state.mnemonic);
  }

}

export default connect(
  undefined,
  {
    login
  }
)(LoginForm);