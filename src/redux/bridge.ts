import { AnyAction } from 'redux';
// import BridgeAPI from '../api/bridge';
import { LOGIN_SUCCESS } from './account';
import { IReduxState } from './configureStore';

/**
 * Reducer
 */

export function reducer(state: any = null, action: AnyAction) {
    if (action.type === LOGIN_SUCCESS) {
        return action.payload.bridge;
    } else {
        return state;
    }
}
/**
 * Selectors
 */

export const selectBridge = (s: IReduxState) => s.bridge;