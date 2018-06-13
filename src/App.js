import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import HomePage from './components/homepage/HomePage';
import OtherPage from './components/homepage/OtherPage';
import LoginContainer from './components/authentication/LoginContainer';

// const AsyncComponent = Loadable({
//   loader: () =>
//     import(/* webpackChunkName: "myNamedChunk" */ './components/SomeComponent'),
//   loading: () => <div>loading...</div>,
//   modules: ['myNamedChunk']
// });

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <div>
              <Route exact path="/" component={HomePage} />
              <Route path="/other" component={OtherPage} />
              <Route path="/authenticate" component={LoginContainer} />
            </div>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
