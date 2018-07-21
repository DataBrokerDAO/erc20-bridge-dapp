import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../components/authentication/LoginPage';
import TransferPage from '../components/transfer/TransferPage';

export default class App extends React.Component {
  public render() {
    return (
      <div className="gradient">
        <Switch>
          <Route path="/authenticate/login" component={LoginPage} />,
        <Route path="/" component={TransferPage} />
        </Switch>
      </div>
    );
  }
}
