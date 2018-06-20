import React, { Component } from 'react';

import Logo from '../../generic/Logo';

export default class FormLogo extends Component {
  render() {
    return (
      <div className="logo">
        <Logo size={60} />
      </div>
    );
  }
}
