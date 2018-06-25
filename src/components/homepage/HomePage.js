import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setMessage } from '../../redux/appReducer';

import Navigation from '../navigation/Navigation';
import Content from '../generic/Content';

class HomePage extends Component {
  componentDidMount() {
    if (!this.props.message) {
      this.props.updateMessage("Hi, I'm from client!");
    }
  }

  render() {
    return [
      <Navigation key="nav" />,

      <Content>
        <p>Redux: {this.props.message}</p>
      </Content>
    ];
  }
}

const mapStateToProps = state => {
  return {
    message: state.app.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMessage: txt => dispatch(setMessage(txt))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
