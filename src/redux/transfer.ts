import { AnyAction } from 'redux';
import { EventLog } from 'web3/types';
import { createContext, createReducer } from './utils';

/**
 * Types
 */
export const ctx = createContext('transfer');

export const START_DEPOSIT_PROCEDURE = ctx('START_DEPOSIT_PROCEDURE');
export const DEPOSIT_PROCEDURE_SUCCESS = ctx('DEPOSIT_PROCEDURE_SUCCESS');
export const DEPOSIT_PROCEDURE_FAILURE = ctx('DEPOSIT_PROCEDURE_FAILURE');

export const START_WITHDRAW_PROCEDURE = ctx('START_WITHDRAW_PROCEDURE');
export const WITHDRAW_PROCEDURE_SUCCESS = ctx('WITHDRAW_PROCEDURE_SUCCESS');
export const WITHDRAW_PROCEDURE_FAILURE = ctx('WITHDRAW_PROCEDURE_FAILURE');

export const FOREIGN_BRIDGE_EVENT = ctx('FOREIGN_BRIDGE_EVENT');
export const SET_CURRENT_STEP = ctx('SET_CURRENT_STEP');
export const SET_REQUIRED_SIGNATURE_COUNT = ctx('SET_REQUIRED_SIGNATURE_COUNT');
export const ADD_SIGNATURE = ctx('ADD_SIGNATURE');

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
    Withdrawal = "withdrawal"
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
    Withdraw,
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
    signatureCount: number,
}

const initialState: ITransferState = {
    status: TransferStatus.None,
    amount: '0',
    requiredSignatureCount: 0,
    signatureCount: 0,
}

const startedReducer = (type: TransferType, currentStep: DepositSteps | WithdrawalSteps) =>
    (state: ITransferState, { amount }: any) =>
        ({ ...initialState, status: TransferStatus.Pending, amount, type, currentStep })

function successReducer(status: ITransferState) {
    return { ...status, status: TransferStatus.Success };
}

function failureReducer(status: ITransferState) {
    return { ...status, status: TransferStatus.Failure };
}

export const reducer = createReducer<ITransferState>({
    [START_DEPOSIT_PROCEDURE]: startedReducer(TransferType.Deposit, DepositSteps.Init),
    [START_WITHDRAW_PROCEDURE]: startedReducer(TransferType.Withdrawal, WithdrawalSteps.Init),

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
}, initialState)

/**
 * Actions
 */

export const startDepositProcedure = (amount: string) => ({
    type: START_DEPOSIT_PROCEDURE,
    payload: { amount }
});

export const startWithdrawProcedure = (amount: string) => ({
    type: START_WITHDRAW_PROCEDURE,
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