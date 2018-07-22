import { replace } from "connected-react-router";
import { AnyAction } from "redux";
import { delay } from "redux-saga";
import { call, put, select, spawn, take, takeEvery } from "redux-saga/effects";
import { EventLog } from "../../node_modules/web3/types";
import BridgeAPI from "../api/bridge";
import { updateBalances } from "./accountSagas";
import { IReduxState } from "./configureStore";
import {
    addSignature,
    CONTINUE_WITHDRAW,
    DEPOSIT_PROCEDURE_SUCCESS,
    DepositSteps,
    FOREIGN_BRIDGE_EVENT,
    IEventAction,
    setCurrentStep,
    setEstimateWithdrawGas,
    setRequiredSignatureCount,
    WITHDRAW_PROCEDURE_SUCCESS,
    WithdrawalSteps
} from "./transfer";
import { IAction } from "./utils";

const eventFilter = (eventName: string, filter = {}) => (action: AnyAction) => {
    if (action.type !== FOREIGN_BRIDGE_EVENT) {
        return false;
    }
    const { payload } = (action as IEventAction);
    if (payload.event !== eventName) {
        return false;
    }
    const filterMatches = !Object.keys(filter)
        .find(key => filter[key] !== payload.returnValues[key])
    return filterMatches;
}

function* collectSignature(action: IEventAction) {
    const { _v, _r, _s } = action.payload.returnValues;
    if (_v) {
        yield put(addSignature({ v: _v, r: _r, s: _s }));
    } else {
        yield put(addSignature());
    }
    return 0;
}

export const depositProcedure = (bridge: BridgeAPI) => function* (action: IAction) {
    const { amount } = action.payload;

    yield put(replace('/pending'));

    const tx = yield call(bridge.tranferToForeign, amount);
    const filter = { _transactionHash: tx.transactionHash };

    const requiredValidators = yield call(bridge.getRequiredValidators);
    yield put(setRequiredSignatureCount(requiredValidators));

    yield put(setCurrentStep(DepositSteps.Sent));

    yield takeEvery(eventFilter('WithdrawRequestSigned', filter), collectSignature);

    yield take(eventFilter('MintRequestExecuted', filter));

    yield call(delay, 5000);

    yield put(setCurrentStep(DepositSteps.Minted))

    yield put({ type: DEPOSIT_PROCEDURE_SUCCESS })

    yield spawn(updateBalances, bridge);
    return 0;
}

export const withdrawProcedure = (bridge: BridgeAPI) => function* (action: IAction) {
    const { amount } = action.payload;

    yield put(replace('/pending'));

    const tx = yield call(bridge.tranferToHome, amount);
    const filter = { _transactionHash: tx.transactionHash };

    const requiredValidators = yield call(bridge.getRequiredValidators);
    yield put(setRequiredSignatureCount(requiredValidators));

    yield put(setCurrentStep(WithdrawalSteps.Sent));

    yield takeEvery(eventFilter('WithdrawRequestSigned', filter), collectSignature);

    yield take(eventFilter('WithdrawRequestGranted', filter));

    yield put(setEstimateWithdrawGas('1000000000000'))

    yield put(setCurrentStep(WithdrawalSteps.Signed));

    yield take(CONTINUE_WITHDRAW);
    yield put(setCurrentStep(WithdrawalSteps.Withdrawing))

    const signatures = yield select((s: IReduxState) => s.transfer.signatures);

    const withdrawTx = yield call(bridge.withdrawTokens, amount, tx.blockNumber, signatures);
    console.log(withdrawTx)

    yield call(delay, 1000);

    yield put(setCurrentStep(WithdrawalSteps.Received))

    yield put({ type: WITHDRAW_PROCEDURE_SUCCESS })

    yield spawn(updateBalances, bridge);

    return 0;
}

export function* listenForForeignBridgeEvents(bridge: BridgeAPI) {
    let blockNum;
    while (true) {
        const events: EventLog[] = yield call(bridge.pollForEvents, blockNum);
        for (const evt of events) {
            if (!blockNum || evt.blockNumber >= blockNum) {
                blockNum = evt.blockNumber + 1;
            }
            yield put({ type: FOREIGN_BRIDGE_EVENT, payload: evt });
        }
        yield call(delay, 2e3);
    }
}