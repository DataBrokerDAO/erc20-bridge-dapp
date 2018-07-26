import BridgeAPI from '../api/bridge';
import { IReduxState } from './configureStore';
import { createContext, createReducer } from './utils';

/**
 * Types
 */
export const ctx = createContext('account');

export const LOGIN_REQUEST = ctx('LOGIN_REQUEST');
export const LOGIN_SUCCESS = ctx('LOGIN_SUCCESS');
export const LOGIN_FAILURE = ctx('LOGIN_FAILURE');
export const LOGOUT = ctx('LOGOUT');

export const FETCH_BALANCES_REQUEST = ctx('FETCH_BALANCES_REQUEST');
export const FETCH_BALANCES_SUCCESS = ctx('FETCH_BALANCES_SUCCESS');

/**
 * Reducer
 */

export enum AccountStatus {
  LoggingIn = "pending",
  LoggedIn = "in",
  LoggedOut = "out",
}

export interface IAccountState {
  status: AccountStatus;
  address?: string,
  privateKey?: string;
  homeBalance: string;
  foreignBalance: string;
  homeEthBalance: string;
}

const initialState: IAccountState = {
  status: AccountStatus.LoggedOut,
  homeBalance: '0',
  foreignBalance: '0',
  homeEthBalance: '0'
}

export const reducer = createReducer<IAccountState>({
  [LOGOUT]: () => initialState,
  [LOGIN_REQUEST]: (state) => ({
    ...state,
    status: AccountStatus.LoggingIn,
  }),
  [LOGIN_SUCCESS]: (state, { privateKey, address }) => ({
    ...state,
    status: AccountStatus.LoggedIn,
    privateKey,
    address
  }),
  [LOGIN_FAILURE]: () => initialState,
  [FETCH_BALANCES_SUCCESS]: (state, { homeBalance, foreignBalance, homeEthBalance }) => ({
    ...state,
    homeBalance,
    foreignBalance,
    homeEthBalance
  }),
}, initialState)

/**
 * Actions
 */

export const loginWithMnemonic = (mnemonic: string) => ({
  type: LOGIN_REQUEST,
  payload: { mnemonic }
});

export const loginWithPrivateKey = (privateKey: string) => ({
  type: LOGIN_REQUEST,
  payload: { privateKey }
});

export const loginSuccess = (bridge: BridgeAPI, privateKey: string, address: string) => ({
  type: LOGIN_SUCCESS,
  payload: { privateKey, address, bridge }
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const logout = () => ({
  type: LOGOUT,
});

export const fetchBalancesRequest = () => ({
  type: FETCH_BALANCES_REQUEST
});

export const fetchBalancesSuccess = (homeBalance: string, foreignBalance: string, homeEthBalance: string) => ({
  type: FETCH_BALANCES_SUCCESS,
  payload: { homeBalance, foreignBalance, homeEthBalance }
});

/**
 * Selectors
 */

export const selectIsLoggedIn = (s: IReduxState) => s.account.status === AccountStatus.LoggedIn;