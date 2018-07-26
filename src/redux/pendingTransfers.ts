import { TransferType } from './transfer';
import { createContext, createReducer } from './utils';

/**
 * Types
 */
export const ctx = createContext('pendingTransfers');

export const ADD_TRANSFER = ctx('ADD_TRANSFER');
export const REMOVE_TRANSFER = ctx('REMOVE_TRANSFER');

/**
 * Reducer
 */

export interface IPendingTransfer {
    transferType: TransferType;
    transactionHash: string;
    amount: string;
    startTime: number;
}

export type IPendingTransfersState = IPendingTransfer[];

const initialState: IPendingTransfersState = [];

export const reducer = createReducer<IPendingTransfersState>({
    [ADD_TRANSFER]: (transfers, { pendingTransfer }) => ([
        ...transfers,
        pendingTransfer
    ]),
    [REMOVE_TRANSFER]: (transfers, { txHash }) => 
        transfers.filter(t => t.transactionHash !== txHash)
}, initialState)

/**
 * Actions
 */

export const addTransfer = (transactionHash: string, transferType: TransferType, amount: string) => ({
    type: ADD_TRANSFER,
    payload: {
        pendingTransfer: {
            transactionHash,
            transferType,
            amount,
            startTime: Date.now()
        }
    }
});

export const removeTransfer = (txHash: string) => ({
    type: REMOVE_TRANSFER,
    payload: { txHash }
});