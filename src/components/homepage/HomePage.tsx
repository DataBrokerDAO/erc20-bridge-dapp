import React, { Component } from 'react';
import * as Redux from 'redux';

import { connect } from 'react-redux';
import { setMessage } from '../../redux/appReducer';

import { IReduxState } from '../../redux/configureStore';
import Content from '../generic/Content';
import Navigation from '../navigation/Navigation';

interface IOwnProps {}

interface IStateProps {
  message: string | null;
}

interface IDispatchProps {
  updateMessage: (txt: string) => void;
}

type Props = IStateProps & IDispatchProps & IOwnProps;

interface IState {}

class HomePage extends Component<Props, IState> {
  public componentDidMount() {
    if (!this.props.message) {
      this.props.updateMessage("Hi, I'm from client!");
    }
  }

  public render() {
    return [
      <Navigation key="nav" />,
      <Content key="content">
        <p>Redux: {this.props.message}</p>
      </Content>
    ];
  }
}

function mapStateToProps(state: IReduxState, ownProps: IOwnProps): IStateProps {
  return {
    message: state.app.message
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch,
  ownProps: IOwnProps
): IDispatchProps {
  return {
    updateMessage: (txt: string) => dispatch(setMessage(txt))
  };
}

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
