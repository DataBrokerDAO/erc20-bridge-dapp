/**
 * Component linking images to the build folder.
 */
import React, { Component } from 'react';

export default class Image extends Component {
  render() {
    return (
      <img
        src={`static/media/${this.props.src}`}
        className={this.props.className}
        alt={this.props.alt}
      />
    );
  }
}
