import * as React from "react";
import { Route, Switch } from "react-router-dom";

import LoginPage from "../components/authentication/LoginPage";
import NavBar from "../components/generic/navbar/Navbar";
import Transfer from "./Transfer";

export default class App extends React.Component<{persistor: any}> {
  public render() {
    return <div className="App">
        <NavBar logo="/images/white-logo.svg" />
        <div className="page-container">
          <Switch>
            <Route path="/login" component={LoginPage} />,
            <Route path="/" component={Transfer} />
          </Switch>
        </div>
      </div>;
  }
}
