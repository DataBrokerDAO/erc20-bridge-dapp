import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import { History } from 'history'
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
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

export default function configureStore(initialState = {}, history: History) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    sagaMiddleware,
    routerMiddleware(history),
    createLogger()
  ];

  const createStoreWithMiddleware = composeWithDevTools(
    applyMiddleware(...middleware)
  )(createStore);

  const persistConfig = {
    key: 'root',
    whitelist: ['account', 'pendingTransfers'],
    storage,
  }

  let reducer = persistReducer(persistConfig, rootReducer);
  reducer = connectRouter(history)(reducer);

  const store = createStoreWithMiddleware(reducer, initialState);

  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga);
  return { store, persistor };
}