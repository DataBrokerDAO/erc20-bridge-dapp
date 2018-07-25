import { AnyAction } from 'redux';
import { EventLog } from 'web3/types';
import { ISignature } from '../api/bridge';
import { createContext, createReducer } from './utils';

/**
 * Types
 */
export const ctx = createContext('transfer');

export const REQUEST_DEPOSIT = ctx('REQUEST_DEPOSIT');
export const NEW_DEPOSIT = ctx('NEW_DEPOSIT');

export const DEPOSIT_PROCEDURE_SUCCESS = ctx('DEPOSIT_PROCEDURE_SUCCESS');
export const DEPOSIT_PROCEDURE_FAILURE = ctx('DEPOSIT_PROCEDURE_FAILURE');

export const REQUEST_WITHDRAW = ctx('REQUEST_WITHDRAW');
export const NEW_WITHDRAW = ctx('NEW_WITHDRAW');

export const WITHDRAW_PROCEDURE_SUCCESS = ctx('WITHDRAW_PROCEDURE_SUCCESS');
export const WITHDRAW_PROCEDURE_FAILURE = ctx('WITHDRAW_PROCEDURE_FAILURE');

export const FOREIGN_BRIDGE_EVENT = ctx('FOREIGN_BRIDGE_EVENT');
export const SET_CURRENT_STEP = ctx('SET_CURRENT_STEP');
export const SET_REQUIRED_SIGNATURE_COUNT = ctx('SET_REQUIRED_SIGNATURE_COUNT');
export const ADD_SIGNATURE = ctx('ADD_SIGNATURE');
export const SET_ESTIMATE_WITHDRAW_GAS = ctx('SET_ESTIMATE_WITHDRAW_GAS');
export const CONFIRM_WITHDRAW = ctx('CONFIRM_WITHDRAW');
export const SET_AMOUNT = ctx('SET_AMOUNT');

/**
 * Reducer
 */

export enum TransferStatus {
    None = "none",
    Pending = "pending",
    Success = "success",
    Failure = "failure"
}

export enum TransferType {
    Deposit = "deposit",
    Withdrawal = "withdraw"
}

export enum DepositSteps {
    Init,
    Sent,
    Signed,
    Minted
}

export enum WithdrawalSteps {
    Init,
    Sent,
    Signed,
    Withdrawing,
    Received
}

export interface IEventAction extends AnyAction {
    payload: EventLog
}

export interface ITransferState {
    type?: TransferType,
    status: TransferStatus
    currentStep?: DepositSteps | WithdrawalSteps,
    amount: string,
    requiredSignatureCount: number,
    signatures: ISignature[],
    estimateWithdrawGas: string,
}

const initialState: ITransferState = {
    status: TransferStatus.None,
    amount: '0',
    requiredSignatureCount: 0,
    estimateWithdrawGas: '0',
    signatures: []
}

const startedReducer = (type: TransferType, currentStep: DepositSteps | WithdrawalSteps) =>
    (state: ITransferState, { amount }: any) =>
        ({ ...initialState, status: TransferStatus.Pending, amount, type, currentStep })

function successReducer(state: ITransferState) {
    return { ...state, status: TransferStatus.Success };
}

function failureReducer(state: ITransferState) {
    return { ...state, status: TransferStatus.Failure };
}

export const reducer = createReducer<ITransferState>({
    [NEW_DEPOSIT]: startedReducer(TransferType.Deposit, DepositSteps.Init),
    [NEW_WITHDRAW]: startedReducer(TransferType.Withdrawal, WithdrawalSteps.Init),
    [SET_AMOUNT]: (state, { amount }) => ({
        ...state,
        amount
    }),

    [WITHDRAW_PROCEDURE_SUCCESS]: successReducer,
    [DEPOSIT_PROCEDURE_SUCCESS]: successReducer,

    [WITHDRAW_PROCEDURE_FAILURE]: failureReducer,
    [DEPOSIT_PROCEDURE_FAILURE]: failureReducer,

    [SET_CURRENT_STEP]: (state, { step }) => ({
        ...state,
        currentStep: step
    }),
    [SET_REQUIRED_SIGNATURE_COUNT]: (state, { requiredSignatureCount }) => ({
        ...state,
        requiredSignatureCount
    }),
    [ADD_SIGNATURE]: (state, { signature }) => ({
        ...state,
        signatures: signature ? [...state.signatures, signature] : state.signatures,
    }),
    [SET_ESTIMATE_WITHDRAW_GAS]: (state, { estimateWithdrawGas }) => ({
        ...state,
        estimateWithdrawGas
    }),
}, initialState)

/**
 * Actions
 */

export const requestDeposit = (amount: string) => ({
    type: REQUEST_DEPOSIT,
    payload: { amount }
});

export const requestWithdraw = (amount: string) => ({
    type: REQUEST_WITHDRAW,
    payload: { amount }
});

export const newDeposit = (amount: string) => ({
    type: NEW_DEPOSIT,
    payload: { amount }
});

export const newWithdraw = (amount: string) => ({
    type: NEW_WITHDRAW,
    payload: { amount }
});

export const setCurrentStep = (step: DepositSteps | WithdrawalSteps) => ({
    type: SET_CURRENT_STEP,
    payload: { step }
});

export const setRequiredSignatureCount = (requiredSignatureCount: number) => ({
    type: SET_REQUIRED_SIGNATURE_COUNT,
    payload: { requiredSignatureCount }
});

export const setEstimateWithdrawGas = (estimateWithdrawGas: string) => ({
    type: SET_ESTIMATE_WITHDRAW_GAS,
    payload: { estimateWithdrawGas }
});

export const confirmWithdraw = () => ({
    type: CONFIRM_WITHDRAW,
});

export const addSignature = (signature?: ISignature) => ({
    type: ADD_SIGNATURE,
    payload: { signature }
});

export const setAmount = (amount: string) => ({
    type: SET_AMOUNT,
    payload: { amount }
});
