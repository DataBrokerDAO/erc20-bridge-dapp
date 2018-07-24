import { replace } from "connected-react-router";
import { delay } from "redux-saga";
import { call, cancel, fork, put, select, spawn, take } from "redux-saga/effects";
import { EventLog } from "../../node_modules/web3/types";
import BridgeAPI from "../api/bridge";
import { setHomeEthBalance } from "./account";
import { updateBalances } from "./accountSagas";
import { IReduxState } from "./configureStore";
import {
    addSignature,
    CONFIRM_WITHDRAW,
    DEPOSIT_PROCEDURE_SUCCESS,
    DepositSteps,
    FOREIGN_BRIDGE_EVENT,
    IEventAction,
    newDeposit,
    newWithdraw,
    setAmount,
    setCurrentStep,
    setEstimateWithdrawGas,
    setRequiredSignatureCount,
    WITHDRAW_PROCEDURE_SUCCESS,
    WithdrawalSteps,
} from "./transfer";
import { eventFilter, IAction } from "./utils";

export function* collectSignature(action: IEventAction) {
    const { _v, _r, _s } = action.payload.returnValues;
    if (_v) {
        yield put(addSignature({ v: _v, r: _r, s: _s }));
    } else {
        yield put(addSignature());
    }
    return 0;
}

export function getTxHashFromPath(pathname: string) {
    if (!isDepositPath(pathname) && !isWithdrawalPath(pathname)) {
        return false;
    }

    const paths = pathname.split("/").slice(1);
    const txHash = paths[1];

    if (txHash && /^0x([A-Fa-f0-9]{64})$/.test(txHash)) {
        return txHash;
    }
    return false;
}

export function isDepositPath(pathname: string) {
    return /deposit/.test(pathname);
}

export function isWithdrawalPath(pathname: string) {
    return /withdraw/.test(pathname);
}


export const depositProcedure = (bridge: BridgeAPI) => function* (action: IAction) {
    const { amount } = action.payload;
    yield put(newDeposit(amount));

    yield put(replace('/deposit/'));

    const tx = yield call(bridge.tranferToForeign, amount);

    yield spawn(initDepositProcedure, bridge, tx.transactionHash);
    return 0;
}

export function* initDepositProcedure(bridge: BridgeAPI, txHash: string) {
    yield put(replace(`/deposit/${txHash}`));

    const { tx, amount } = yield call(bridge.getTransferToForeign, txHash);
    if (!tx || !amount) {
        console.error("Transaction:", txHash, "not found");
        return;
    }
    yield put(setAmount(amount));

    const requiredValidators = yield call(bridge.getRequiredValidators);
    yield put(setRequiredSignatureCount(requiredValidators));

    yield put(setCurrentStep(DepositSteps.Sent));
    const eventListener = yield fork(watchForeignBridgeEvents, bridge, txHash);

    yield take(eventFilter(FOREIGN_BRIDGE_EVENT, 'MintRequestExecuted'));

    yield put(setCurrentStep(DepositSteps.Minted))

    yield put({ type: DEPOSIT_PROCEDURE_SUCCESS })

    yield spawn(updateBalances, bridge);

    yield cancel(eventListener);
    return 0;
}

export const withdrawProcedure = (bridge: BridgeAPI) => function* (action: IAction) {
    const { amount } = action.payload;
    yield put(newWithdraw(amount));

    yield put(replace('/withdraw/'));

    const tx = yield call(bridge.tranferToHome, amount);

    yield spawn(initWithdrawProcedure, bridge, tx.transactionHash);
    return 0;
}

export function* initWithdrawProcedure(bridge: BridgeAPI, txHash: string) {
    yield put(replace(`/withdraw/${txHash}`));

    const { tx, amount } = yield call(bridge.getTransferToHome, txHash);
    if (!tx || !amount) {
        console.error("Transaction:", txHash, "not found");
        return;
    }
    yield put(setAmount(amount));

    const requiredValidators = yield call(bridge.getRequiredValidators);
    yield put(setRequiredSignatureCount(requiredValidators));

    yield put(setCurrentStep(WithdrawalSteps.Sent));
    const eventListener = yield fork(watchForeignBridgeEvents, bridge, txHash);

    yield take(eventFilter(FOREIGN_BRIDGE_EVENT, 'WithdrawRequestGranted'));

    const signatures = yield select((s: IReduxState) => s.transfer.signatures);
    const withdrawCall = bridge.getWithdrawCall(amount, tx.blockNumber, signatures);

    const estimateGas = yield call(bridge.estimateWithdrawGas, withdrawCall);
    yield put(setEstimateWithdrawGas(estimateGas));

    const homeEthBalance = yield call(bridge.getHomeBalance);
    yield put(setHomeEthBalance(homeEthBalance));

    yield put(setCurrentStep(WithdrawalSteps.Signed));

    yield take(CONFIRM_WITHDRAW);
    yield put(setCurrentStep(WithdrawalSteps.Withdrawing))

    yield call(bridge.sendWithdraw, withdrawCall);

    yield put(setCurrentStep(WithdrawalSteps.Received))

    yield put({ type: WITHDRAW_PROCEDURE_SUCCESS })

    yield spawn(updateBalances, bridge);

    yield cancel(eventListener);

    return 0;
}

function* watchForeignBridgeEvents(bridge: BridgeAPI, txHash: string) {
    let blockNum = 0;
    while (true) {
        const events: EventLog[] = yield call(bridge.pollForEvents, blockNum, { _transactionHash: txHash });
        for (const evt of events) {
            if (!blockNum || evt.blockNumber >= blockNum) {
                blockNum = evt.blockNumber + 1;
            }
            yield put({ type: FOREIGN_BRIDGE_EVENT, payload: evt });
        }
        yield call(delay, 2e3);
    }
}