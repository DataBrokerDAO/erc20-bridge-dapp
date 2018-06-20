import React, { Component } from 'react';

import './Content.css';

class Content extends Component {
  render() {
    return <main className="container content">{this.props.children}</main>;
  }
}

export default Content;
