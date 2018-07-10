import React, { Component } from 'react';

export default class Logo extends Component<{ size: number }, any> {
  public render() {
    return (
      <img
        src="/images/logo_certimint_gradient.svg"
        alt="logo"
        height={this.props.size || 30}
      />
    );
  }
}
