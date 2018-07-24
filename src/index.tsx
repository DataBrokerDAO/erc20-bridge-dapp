import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';

import './index.css';
import App from './layouts/App';
import configureStore from './redux/configureStore';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();
const { store, persistor } = configureStore({}, history); // If there is state on the server, store will be configured with that, otherwise with empty state.

// Wait for document to load all chunks.
window.onload = () => {
  Loadable.preloadReady().then(() => {
    const root = document.getElementById('root');
    const renderOrHydrate = root!.innerHTML.trim().length
      ? 'hydrate'
      : 'render';

    ReactDOM[renderOrHydrate](
      <ReduxProvider store={store}>
        <ConnectedRouter history={history}>
          <App persistor={persistor} />
        </ConnectedRouter>
      </ReduxProvider>,
      document.getElementById('root')
    );
  });
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
