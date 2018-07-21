import { replace } from "connected-react-router";
import { AnyAction } from "redux";
import { delay } from "redux-saga";
import { call, put, spawn, take } from "redux-saga/effects";
import { EventLog } from "../../node_modules/web3/types";
import BridgeAPI from "../api/bridge";
import { updateBalances } from "./accountSagas";
import { DEPOSIT_PROCEDURE_SUCCESS, DepositSteps, FOREIGN_BRIDGE_EVENT, IEventAction, setCurrentStep, setRequiredSignatureCount } from "./transfer";
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
    const { amount } = action.payload;
    console.log(amount);
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