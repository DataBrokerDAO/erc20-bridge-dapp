import { replace } from "connected-react-router";
import { AnyAction } from "redux";
import { delay } from "redux-saga";
import { call, put, spawn, take } from "redux-saga/effects";
import { EventLog } from "../../node_modules/web3/types";
import BridgeAPI from "../api/bridge";
import { updateBalances } from "./accountSagas";
import {
    ADD_SIGNATURE,
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

const eventFilter = (eventName: string) => (action: AnyAction) =>
    action.type === FOREIGN_BRIDGE_EVENT
    && (action as IEventAction).payload.event === eventName;

export const depositProcedure = (bridge: BridgeAPI) => function* (action: IAction) {
    const { amount } = action.payload;

    yield put(replace('/pending'));

    const tx = yield call(bridge.tranferToForeign, amount);

    yield put(setCurrentStep(DepositSteps.Sent));

    const requiredValidators = yield call(bridge.getRequiredValidators);
    yield put(setRequiredSignatureCount(requiredValidators));

    while (true) {
        const { payload }: IEventAction = yield take(eventFilter('MintRequestExecuted'));
        if (payload.returnValues._transactionHash === tx.transactionHash) {
            break;
        }
    }
    yield call(delay, 5000);

    yield put(setCurrentStep(DepositSteps.Minted))

    yield put({ type: DEPOSIT_PROCEDURE_SUCCESS })

    yield spawn(updateBalances, bridge);
    return 0;
}

export const withdrawProcedure = (bridge: BridgeAPI) => function* (action: IAction) {
    // const { amount } = action.payload;

    yield put(replace('/pending'));

    // const tx = yield call(bridge.tranferToHome, amount);

    yield call(delay, 2000);

    yield put(setCurrentStep(WithdrawalSteps.Sent));
    yield put(setRequiredSignatureCount(3));

    for (let i = 0; i < 3; i++) {
        yield call(delay, 1000);
        yield put({ type: ADD_SIGNATURE });
    }

    yield put(setCurrentStep(WithdrawalSteps.Signed));

    yield put(setEstimateWithdrawGas('1000000000000'))

    yield take(CONTINUE_WITHDRAW);
    yield put(setCurrentStep(WithdrawalSteps.Withdrawing))
    // while (true) {
    //     const { payload }: IEventAction = yield take(eventFilter('MintRequestExecuted'));
    //     if (payload.returnValues._transactionHash === tx.transactionHash) {
    //         break;
    //     }
    // }

    yield call(delay, 5000);

    yield put(setCurrentStep(WithdrawalSteps.Received))

    yield put({ type: WITHDRAW_PROCEDURE_SUCCESS })

    return 0;
}

export function* listenForForeignBridgeEvents(bridge: BridgeAPI) {
    let prevBlockNumber;
    while (true) {
        const events: EventLog[] = yield call(bridge.pollForEvents, prevBlockNumber);
        for (const evt of events) {
            if (!prevBlockNumber || evt.blockNumber > prevBlockNumber) {
                prevBlockNumber = evt.blockNumber;
                yield put({ type: FOREIGN_BRIDGE_EVENT, payload: evt });
            }
        }
        yield call(delay, 2e3);
    }
}