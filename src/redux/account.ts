import { IReduxState } from './configureStore';
import { createContext, createReducer } from './utils';

/**
 * Types
 */
export const ctx = createContext('account');

export const LOGIN = ctx('LOGIN');
export const LOGOUT = ctx('LOGOUT');
export const SET_ADDRESS = ctx('SET_ADDRESS');

export const FETCH_BALANCES_SUCCESS = ctx('FETCH_BALANCES_SUCCESS');

export const REQUEST_HOME_ETH_BALANCE = ctx('REQUEST_HOME_ETH_BALANCE');
export const SET_HOME_ETH_BALANCE = ctx('SET_HOME_ETH_BALANCE');

/**
 * Reducer
 */

export enum AccountStatus {
  LoggedIn = "in",
  LoggedOut = "out",
}

export interface IAccountState {
  status: AccountStatus;
  address?: string,
  mnemonic?: string;
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
  [LOGIN]: (state, { mnemonic }) => ({
    ...state,
    status: AccountStatus.LoggedIn,
    mnemonic
  }),
  [SET_ADDRESS]: (state, { address }) => ({
      ...state,
      address
  }),
  [FETCH_BALANCES_SUCCESS]: (state, { homeBalance, foreignBalance }) => ({
    ...state,
    homeBalance,
    foreignBalance
  }),
  [SET_HOME_ETH_BALANCE]: (state, { homeEthBalance }) => ({
    ...state,
    homeEthBalance
  }),
}, initialState)

/**
 * Actions
 */

export const login = (mnemonic: string) => ({
  type: LOGIN,
  payload: { mnemonic }
});

export const logout = () => ({
  type: LOGOUT,
});

export const fetchBalancesSuccess = (homeBalance: string, foreignBalance: string) => ({
  type: FETCH_BALANCES_SUCCESS,
  payload: { homeBalance, foreignBalance }
});

export const setHomeEthBalance = (homeEthBalance: string) => ({
  type: SET_HOME_ETH_BALANCE,
  payload: { homeEthBalance }
});

export const setAddress = (address: string) => ({
    type: SET_ADDRESS,
    payload: { address }
});

export const requestHomeEthBalance = () => ({
    type: REQUEST_HOME_ETH_BALANCE,
});

/**
 * Selectors
 */

export const selectIsLoggedIn = (s: IReduxState) => s.account.status === AccountStatus.LoggedIn;