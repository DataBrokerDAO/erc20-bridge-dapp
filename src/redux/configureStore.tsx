import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import { History } from 'history'
import { applyMiddleware, combineReducers, createStore, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';

import { IAccountState, reducer as accountReducer } from './account';
import { IPendingTransfersState, reducer as pendingTransfersReducer } from './pendingTransfers';
import { ITransferState, reducer as transferReducer } from './transfer';

export interface IReduxState {
  account: IAccountState,
  transfer: ITransferState,
  pendingTransfers: IPendingTransfersState,
  router: RouterState
}

const rootReducer = combineReducers({
  account: accountReducer,
  transfer: transferReducer,
  pendingTransfers: pendingTransfersReducer
});

export default function configureStore(initialState = {}, history?: History) {

  const middleware: Middleware[] = [];

  const sagaMiddleware = createSagaMiddleware();
  if (history) {
    middleware.push(sagaMiddleware)
    middleware.push(routerMiddleware(history));
  }

  if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');
    middleware.push(createLogger());
  }

  const createStoreWithMiddleware = composeWithDevTools(
    applyMiddleware(...middleware)
  )(createStore);

  const persistConfig = {
    key: 'root',
    whitelist: ['account', 'pendingTransfers'],
    storage,
  }

  let reducer = rootReducer;
  if (history) {
    reducer = persistReducer(persistConfig, rootReducer);
    reducer = connectRouter(history)(reducer);
  }

  const store = createStoreWithMiddleware(reducer, initialState);

  if (history) {
    const persistor = persistStore(store)
    sagaMiddleware.run(rootSaga);
    return { store, persistor };
  }
  return { store };
}