import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './layouts/App';
import configureStore from './redux/configureStore';
import * as serviceWorker from './serviceWorker';
var store = configureStore(window.REDUX_STATE || {}); // If there is state on the server, store will be configured with that, otherwise with empty state.
// Wait for document to load all chunks.
window.onload = function () {
    Loadable.preloadReady().then(function () {
        var root = document.getElementById('root');
        var renderOrHydrate = root.innerHTML.trim().length
            ? 'hydrate'
            : 'render';
        ReactDOM[renderOrHydrate](React.createElement(ReduxProvider, { store: store },
            React.createElement(BrowserRouter, null,
                React.createElement(App, null))), document.getElementById('root'));
    });
};
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
//# sourceMappingURL=index.js.map