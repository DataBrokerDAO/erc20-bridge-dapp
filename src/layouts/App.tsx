import * as React from "react";
import { Route, Switch } from "react-router-dom";

import LoginPage from "../components/authentication/LoginPage";
import NavBar from "../components/generic/navbar/Navbar";
import Transfer from "./Transfer";

import { PersistGate } from 'redux-persist/integration/react'
import Loading from "../components/generic/Loading";

export default class App extends React.Component<{persistor: any}> {
  public render() {
    return <div className="App">
        <NavBar logo="/images/white-logo.svg" />
        <div className="page-container">
          <PersistGate loading={<Loading />} persistor={this.props.persistor}>
            <Switch>
              <Route path="/login" component={LoginPage} />,
              <Route path="/" component={Transfer} />
            </Switch>
          </PersistGate>
        </div>
      </div>;
  }
}
