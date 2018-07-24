import * as React from "react";
import { Route, Switch } from "react-router-dom";

import LoginPage from "../components/authentication/LoginPage";
import NavBar from "../components/generic/navbar/Navbar";
import Transfer from "./Transfer";

export default class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <NavBar logo="/images/white-logo.svg" />

        <div className="page-container">
          <Switch>
            <Route path="/authenticate/login" component={LoginPage} />,
            <Route path="/" component={Transfer} />
          </Switch>
        </div>
      </div>
    );
  }
}
