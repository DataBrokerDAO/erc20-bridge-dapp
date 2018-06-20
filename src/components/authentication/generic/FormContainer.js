import React, { Component } from 'react';

export default class FormContainer extends Component {
  render() {
    const { left, right, rightColored } = this.props;

    return (
      <div className="container auth">
        <div className="row">
          <div
            className="col-sm d-xs-none d-sm-block left"
            style={{
              backgroundColor: rightColored ? '#fff' : '#f5f5f5'
            }}
          >
            {left}
          </div>
          <div
            className="col-sm right"
            style={{
              backgroundColor: rightColored ? '#f5f5f5' : '#fff'
            }}
          >
            {right}
          </div>
        </div>
      </div>
    );
  }
}
