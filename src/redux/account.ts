import { createContext, createReducer } from './utils';

export const ctx = createContext('account');

export const SET_MNEMONIC = ctx('SET_MNEMONIC');

export const FETCH_BALANCES_SUCCESS = ctx('FETCH_BALANCES_SUCCESS');

export const SET_HOME_ETH_BALANCE = ctx('SET_HOME_ETH_BALANCE');

export interface IAccountState {
  mnemonic?: string;
  homeBalance: string;
  foreignBalance: string;
  homeEthBalance: string;
}

const initialState: IAccountState = {
  homeBalance: '0',
  foreignBalance: '0',
  homeEthBalance: '0'
}

export const reducer = createReducer<IAccountState>({
  [SET_MNEMONIC]: (state, { mnemonic }) => ({
    ...state,
    mnemonic
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


export const setMnemonic = (mnemonic: string) => ({
  type: SET_MNEMONIC,
  payload: { mnemonic }
});

export const fetchBalancesSuccess = (homeBalance: string, foreignBalance: string) => ({
  type: FETCH_BALANCES_SUCCESS,
  payload: { homeBalance, foreignBalance }
});

export const setHomeEthBalance = (homeEthBalance: string) => ({
  type: SET_HOME_ETH_BALANCE,
  payload: { homeEthBalance }
});