import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';

import { IAccountState, reducer as accountReducer } from './account';

const sagaMiddleware = createSagaMiddleware()
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(sagaMiddleware))(
  createStore
);

export interface IReduxState {
  account: IAccountState
}

const rootReducer = combineReducers({
  account: accountReducer,
});

export default function configureStore(initialState = {}) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  sagaMiddleware.run(rootSaga);
  return store;
}