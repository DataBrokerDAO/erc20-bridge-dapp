import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './layouts/App';
import configureStore from './redux/configureStore';
import * as serviceWorker from './serviceWorker';

const store = configureStore((window as any).REDUX_STATE || {}); // If there is state on the server, store will be configured with that, otherwise with empty state.

// Wait for document to load all chunks.
window.onload = () => {
  Loadable.preloadReady().then(() => {
    const root = document.getElementById('root');
    const renderOrHydrate = root!.innerHTML.trim().length
      ? 'hydrate'
      : 'render';

    ReactDOM[renderOrHydrate](
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>,
      document.getElementById('root')
    );
  });
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
