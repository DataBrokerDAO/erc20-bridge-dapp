import React, { Component } from 'react';
// import * as Redux from 'redux';

// import { connect } from 'react-redux';

// import { IReduxState } from '../../redux/configureStore';
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
  public render() {
    return [
      <Navigation key="nav" />,
      <Content key="content">
        <p>Redux: {this.props.message}</p>
      </Content>
    ];
  }
}

export default HomePage;
// export default connect<IStateProps, IDispatchProps, IOwnProps>(
//   mapStateToProps,
//   mapDispatchToProps
// )(HomePage);
