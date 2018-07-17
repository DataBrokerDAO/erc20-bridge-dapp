import { createContext, createReducer } from './utils';

export interface IAccountState {
  privateKey?: string;
  publicKey?: string;
}

export const ctx = createContext('account');

export const SET_KEYS = ctx('SET_KEYS');

export const reducer = createReducer<IAccountState>({
  [SET_KEYS]: (state, payload) => ({
    ...state,
    privateKey: 'test'
  })
}, {})

export const selectAccount = (state: any): IAccountState => state.account;