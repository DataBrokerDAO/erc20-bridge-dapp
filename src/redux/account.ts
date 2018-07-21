import { createContext, createReducer } from './utils';

export const ctx = createContext('account');

export const SET_MNEMONIC = ctx('SET_MNEMONIC');

export const FETCH_BALANCES_REQUEST = ctx('FETCH_BALANCES_REQUEST');
export const FETCH_BALANCES_SUCCESS = ctx('FETCH_BALANCES_SUCCESS');
export const FETCH_BALANCES_FAILURE = ctx('FETCH_BALANCES_FAILURE');

export interface IAccountState {
  mnemonic?: string;
  homeBalance: string;
  foreignBalance: string;
}

const initialState: IAccountState = {
  homeBalance: '0',
  foreignBalance: '0'
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
  })
}, initialState)


export const setMnemonic =  (mnemonic: string) => ({
  type: SET_MNEMONIC,
  payload: { mnemonic }
});

export const fetchBalances = () => ({
  type: FETCH_BALANCES_REQUEST
});

export const fetchBalancesSuccess = (homeBalance: string, foreignBalance: string) => ({
  type: FETCH_BALANCES_SUCCESS,
  payload: { homeBalance, foreignBalance }
});

export const fetchBalancesFailure = (homeBalance: string, foreignBalance: string) => ({
  type: FETCH_BALANCES_SUCCESS,
  payload: { homeBalance, foreignBalance }
});