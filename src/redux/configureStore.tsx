import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { IAppState, reducer as appReducer } from './appReducer';

// TODO: add middleware here
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(thunk))(
  createStore
);

export interface IReduxState {
  app: IAppState;
}

const rootReducer = combineReducers({
  app: appReducer
});

export default function configureStore(initialState = {}) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
