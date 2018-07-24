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
        <form key="form" className="text-left" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <h4>Enter your mnemonic text</h4>
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