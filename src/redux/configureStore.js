import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as appReducer } from './appReducer';

// TODO: add middleware here
const createStoreWithMiddleware = compose(
  composeWithDevTools(applyMiddleware(thunk))
)(createStore);

const rootReducer = combineReducers({
  app: appReducer
});

export default function configureStore(initialState = {}) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
