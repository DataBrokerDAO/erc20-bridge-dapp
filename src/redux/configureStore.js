import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer as appReducer } from './appReducer';
// TODO: add middleware here
var createStoreWithMiddleware = composeWithDevTools(applyMiddleware(thunk))(createStore);
var rootReducer = combineReducers({
    app: appReducer
});
export default function configureStore(initialState) {
    if (initialState === void 0) { initialState = {}; }
    return createStoreWithMiddleware(rootReducer, initialState);
}
//# sourceMappingURL=configureStore.js.map