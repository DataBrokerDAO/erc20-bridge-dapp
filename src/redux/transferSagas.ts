import { replace } from "connected-react-router";
import { delay } from "redux-saga";
import { call, cancel, fork, put, select, spawn, take } from "redux-saga/effects";
import { EventLog } from "../../node_modules/web3/types";
import BridgeAPI from "../api/bridge";
import { fetchBalances } from "./accountSagas";
import { selectBridge } from "./bridge";
import { IReduxState } from "./configureStore";
import { addTransfer, removeTransfer } from "./pendingTransfers";
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
    TransferType,
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


export function* depositProcedure(action: IAction) {
    const bridge: BridgeAPI = yield select(selectBridge);
    const { amount } = action.payload;
    yield put(newDeposit(amount));

    yield put(replace('/deposit/'));

    const tx = yield call(bridge.tranferToForeign, amount);

    yield put(addTransfer(tx.transactionHash, TransferType.Deposit, amount));

    yield put(replace(`/deposit/${tx.transactionHash}`));
    return 0;
}

export function* initDepositProcedure(bridge: BridgeAPI, txHash: string) {
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

    yield call(fetchBalances, bridge);

    yield put({ type: DEPOSIT_PROCEDURE_SUCCESS })

    yield put(removeTransfer(txHash));
    yield cancel(eventListener);
    return 0;
}

export function* withdrawProcedure(action: IAction) {
    const bridge: BridgeAPI = yield select(selectBridge);
    const { amount } = action.payload;
    yield put(newWithdraw(amount));

    yield put(replace('/withdraw/'));

    const tx = yield call(bridge.tranferToHome, amount);

    yield put(addTransfer(tx.transactionHash, TransferType.Withdrawal, amount));

    yield put(replace(`/withdraw/${tx.transactionHash}`));
    return 0;
}

export function* initWithdrawProcedure(bridge: BridgeAPI, txHash: string) {
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

    yield put(setCurrentStep(WithdrawalSteps.Signed));

    yield take(CONFIRM_WITHDRAW);
    yield put(setCurrentStep(WithdrawalSteps.Withdrawing))

    yield call(bridge.sendWithdraw, withdrawCall);

    yield put(setCurrentStep(WithdrawalSteps.Received))

    yield put({ type: WITHDRAW_PROCEDURE_SUCCESS })

    yield spawn(fetchBalances, bridge);
    yield put(removeTransfer(txHash));

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