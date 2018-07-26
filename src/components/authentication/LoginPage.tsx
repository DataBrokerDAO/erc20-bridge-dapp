import React, { Component } from 'react';

import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { AccountStatus, IAccountState, loginWithMnemonic, loginWithPrivateKey } from '../../redux/account';
import { IReduxState } from '../../redux/configureStore';
import Container from '../generic/Container';

import './Authentication.css';

const Input = (props: any) => (
  <div className="form-group flex-fill">
    <input
      type="text"
      className="form-control"
      required={true}
      {...props}
    />
  </div>
)

const Button = ({ text }: any) => (
  <button
    className="btn btn-primary ml-3"
    type="submit "
  >
    {text}
  </button>
)

enum Tab {
  mnemonic,
  privateKey,
}

class LoginForm extends Component<{
  account: IAccountState;
  loginWithMnemonic: any;
  loginWithPrivateKey: any;
}> {
  public state = {
    tab: Tab.mnemonic,
    inputValue: ""
  };

  public render() {
    const { tab, inputValue } = this.state;

    if (this.props.account.status === AccountStatus.LoggingIn) {
      return <Spinner className="spinner mt-3" name='three-bounce' fadeIn="quarter" color="#fff" />
    }

    return (
      <Container className="LoginPage">
        <ul className="nav nav-tabs nav-fill">
          <li className="nav-item">
            <a
              onClick={this.switchTab(Tab.mnemonic)}
              className={this.linkClass(Tab.mnemonic)}
            >
              Mnemonic
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={this.switchTab(Tab.privateKey)}
              className={this.linkClass(Tab.privateKey)}
            >
              Private Key
            </a>
          </li>
        </ul>

        <form
          key="form"
          className="form-inline d-flex mt-4"
          onSubmit={this.handleSubmit}
        >

          {tab === Tab.mnemonic ? (
            <Input
              name="mnemonic"
              placeholder="eg. catalog dismiss other deny sphere arm cloud route manual oval cancel dress"
              value={inputValue}
              onChange={this.handleChange}
            />
          ) : (
            <Input
              name="privatekey"
              placeholder="eg. 03b9d06c569cf031feaf0c22d41cbe1b9211ba416bfaa926136b75513fe95317"
              value={inputValue}
              pattern="[a-fA-F\d]+"
              onChange={this.handleChange}
            />
          )}
          <Button text="Login" />
        </form>

        <small className="mt-2 text-center text-muted">No private data is send to our servers.</small>

      </Container>
    );
  }

  private linkClass(tab: Tab) {
    return "nav-link" + (this.state.tab === tab ? " active" : "");
  }

  private switchTab(tab: Tab) {
    return () => this.setState({ tab });
  }

  private handleChange = (evt: any) => {
    this.setState({ inputValue: evt.target.value });
  };

  private handleSubmit = (evt: any) => {
    evt.preventDefault();
    if (this.state.tab === Tab.mnemonic) {
      this.props.loginWithMnemonic(this.state.inputValue);
    } else {
      this.props.loginWithPrivateKey(this.state.inputValue);
    }
  };
}

export default connect(
  (s: IReduxState) => ({ account: s.account }),
  {
    loginWithMnemonic,
    loginWithPrivateKey
  }
)(LoginForm);