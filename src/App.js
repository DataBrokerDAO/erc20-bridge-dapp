import React, { Component } from 'react';
import Loadable from 'react-loadable';

import './App.css';

const AsyncComponent = Loadable({
  loader: () =>
    import(/* webpackChunkName: "myNamedChunk" */ './components/SomeComponent'),
  loading: () => <div>loading...</div>,
  modules: ['myNamedChunk']
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="images/logo.svg" className="App-logo" alt="logo" />
          <AsyncComponent />
        </header>
      </div>
    );
  }
}

export default App;
