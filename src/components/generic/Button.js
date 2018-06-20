import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { type = 'primary', children } = this.props;
    return (
      <button type="button" className="btn btn-{type}">
        {children}
      </button>
    );
  }
}

export default Button;
