import React, { Component } from 'react';

import Logo from '../../generic/Logo';

export default class FormLogo extends Component<any, any> {
  public render() {
    return (
      <div className="logo">
        <Logo size={60} />
      </div>
    );
  }
}
