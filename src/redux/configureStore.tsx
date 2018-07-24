import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import { History } from 'history'
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';

import { IAccountState, reducer as accountReducer } from './account';
import { ITransferState, reducer as transferReducer } from './transfer';

export interface IReduxState {
  account: IAccountState,
  transfer: ITransferState,
  router: RouterState
}

const rootReducer = combineReducers({
  account: accountReducer,
  transfer: transferReducer,
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

  const reducer = connectRouter(history)(rootReducer);

  const store = createStoreWithMiddleware(reducer, initialState);
  sagaMiddleware.run(rootSaga);
  return store;
}