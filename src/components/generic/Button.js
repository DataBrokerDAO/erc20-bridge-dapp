import React, { Component } from 'react';
import propTypes from 'prop-types';

class Button extends Component {
  propTypes: {
    type: propTypes.string
  };

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
